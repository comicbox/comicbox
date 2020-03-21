package database

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/cayleygraph/cayley"
	"github.com/cayleygraph/cayley/graph"
	"github.com/cayleygraph/cayley/query"
	"github.com/cayleygraph/cayley/schema"
	"github.com/cayleygraph/quad"
	"github.com/pkg/errors"
	"github.com/spf13/viper"

	// Load supported backends
	_ "github.com/cayleygraph/cayley/graph/kv/bolt"

	// Load supported backends
	_ "github.com/cayleygraph/cayley/query/graphql"

	// Load all supported quad formats.
	_ "github.com/cayleygraph/quad/dot"
	_ "github.com/cayleygraph/quad/gml"
	_ "github.com/cayleygraph/quad/graphml"
	_ "github.com/cayleygraph/quad/json"
	_ "github.com/cayleygraph/quad/jsonld"
	_ "github.com/cayleygraph/quad/nquads"
	_ "github.com/cayleygraph/quad/pquads"

	// Load writer registry
	_ "github.com/cayleygraph/cayley/writer"
)

var store *graph.Handle

type Person struct {
	// dummy field to enforce all object to have a <id> <rdf:type> <ex:Person> relation
	// means nothing for Go itself
	rdfType struct{} `quad:"@type > ex:Person"`
	ID      quad.IRI `json:"@id"`     // tag @id is a special one - graph node value will be stored in this field
	Name    string   `json:"ex:name"` // field name (predicate) may be written as json field name
	Age     int      `quad:"ex:age"`  // or in a quad tag
}

type Coords struct {
	// Object may be without id - it will be generated automatically.
	// It's also not necessary to have a type definition.
	Lat float64 `json:"ex:lat"`
	Lng float64 `json:"ex:lng"`
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func SetUp() error {
	var err error
	// Associate Go type with an IRI.
	// All Coords objects will now generate a <id> <rdf:type> <ex:Coords> triple.
	schema.RegisterType(quad.IRI("ex:Coords"), Coords{})

	// sch := schema.NewConfig()

	store, err = openDatabase()
	if err != nil {
		return errors.Wrap(err, "failed to open database")
	}

	store.AddQuad(quad.Make("phrase of the day", "is of course", "Hello World!", nil))

	p := cayley.StartPath(store, quad.String("phrase of the day")).Out(quad.String("is of course"))
	// Now we iterate over results. Arguments:
	// 1. Optional context used for cancellation.
	// 2. Flag to optimize query before execution.
	// 3. Quad store, but we can omit it because we have already built path with it.
	err = p.Iterate(nil).EachValue(nil, func(value quad.Value) {
		nativeValue := quad.NativeOf(value) // this converts RDF values to normal Go types
		fmt.Println(nativeValue)
	})
	if err != nil {
		log.Fatalln(err)
	}

	log.Fatal(http.ListenAndServe(":3456", Handler()))
	// // Create a brand new graph
	// store, err = cayley.NewGraph("bolt", path, nil)
	// if err != nil {
	// 	return errors.Wrap(err, "failed to open database")
	// }

	// qw := graph.NewWriter(store)

	// // Save an object
	// bob := Person{
	// 	ID:   quad.IRI("ex:bob").Full().Short(),
	// 	Name: "Bob", Age: 32,
	// }
	// fmt.Printf("saving: %+v\n", bob)
	// id, err := sch.WriteAsQuads(qw, bob)
	// checkErr(err)
	// err = qw.Close()
	// checkErr(err)

	// fmt.Println("id for object:", id, "=", bob.ID) // should be equal

	// // Get object by id
	// var someone Person
	// err = sch.LoadTo(nil, store, &someone, id)
	// checkErr(err)
	// fmt.Printf("loaded: %+v\n", someone)

	// // Or get all objects of type Person
	// var people []Person
	// err = sch.LoadTo(nil, store, &people)
	// checkErr(err)
	// fmt.Printf("people: %+v\n", people)

	// fmt.Println()

	// // Store objects with no ID and type
	// coords := []Coords{
	// 	{Lat: 12.3, Lng: 34.5},
	// 	{Lat: 39.7, Lng: 8.41},
	// }
	// qw = graph.NewWriter(store)
	// for _, c := range coords {
	// 	id, err = sch.WriteAsQuads(qw, c)
	// 	checkErr(err)
	// 	fmt.Println("generated id:", id)
	// }
	// err = qw.Close()
	// checkErr(err)

	// // Get coords back
	// var newCoords []Coords
	// err = sch.LoadTo(nil, store, &newCoords)
	// checkErr(err)
	// fmt.Printf("coords: %+v\n", newCoords)

	// // Print quads
	// fmt.Println("\nquads:")
	// ctx := context.TODO()
	// it := store.QuadsAllIterator()
	// for it.Next(ctx) {
	// 	fmt.Println(store.Quad(it.Result()))
	// }
	os.Exit(0)
	return nil
}

func openDatabase() (*graph.Handle, error) {
	// name := viper.GetString(KeyBackend)
	// path := viper.GetString(KeyAddress)
	// opts := graph.Options(viper.GetStringMap(KeyOptions))
	path := viper.GetString("db")

	err := os.MkdirAll(filepath.Dir(path), 0777)
	if err != nil {
		return nil, errors.Wrap(err, "could not make database directory")
	}

	err = graph.InitQuadStore("bolt", path, nil)
	if err != nil && err != graph.ErrDatabaseExists {
		return nil, errors.Wrap(err, "could not initialize database")
	}

	qs, err := graph.NewQuadStore("bolt", path, nil)
	if err != nil {
		return nil, err
	}
	qw, err := graph.NewQuadWriter("single", qs, nil)
	if err != nil {
		return nil, err
	}
	return &graph.Handle{QuadStore: qs, QuadWriter: qw}, nil
}

func Handler() http.Handler {
	gql := query.GetLanguage("graphql")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		gql.HTTPQuery(r.Context(), store, w, r.Body)
	})
}

func TearDown() error {
	err := store.Close()
	return errors.Wrap(err, "failed to close the database")
}

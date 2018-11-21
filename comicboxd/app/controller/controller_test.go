package controller

import (
	"fmt"
	"math/rand"
	"testing"
)

var dbFiles []string
var realFiles []string
var outA, outB []string

func BenchmarkScan(b *testing.B) {
	for j := 2; j < 4000; j *= 2 {

		b.Run(fmt.Sprintf("Map-%d", j), func(b *testing.B) {

			dbFiles = make([]string, j)
			realFiles = make([]string, j)

			for i := 0; i < j; i++ {
				fName := fmt.Sprintf("/path/to/file/%d.cbz", rand.Int63())
				dbFiles[i] = fName
				realFiles[i] = fName
			}
			outA, outB = DiffSlice(dbFiles, realFiles)
			// fmt.Printf("%#v\n", dbFiles)

		})
	}
	outA, outB = DiffSlice(
		[]string{"a", "b", "c", "d", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"},
		[]string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"},
	)
	fmt.Printf("%#v\n", outA)
	fmt.Printf("%#v\n", outB)

}

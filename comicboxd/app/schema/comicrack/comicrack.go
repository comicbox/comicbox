package comicrack

type Book struct {
	Genres    string
	Manga     string
	Number    float64
	Pages     []Page `xml:"Pages>Page"`
	Penciller string
	Series    string
	Summary   string
	Title     string
	Volume    int
	Writer    string
}

type Page struct {
	Image *int
	Type  string
}

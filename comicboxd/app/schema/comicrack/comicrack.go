package comicrack

type Book struct {
	Genres    *string
	Manga     *string
	Number    *float64
	Pages     []Page `xml:"Pages>Page"`
	Penciller *string
	Series    *string
	Summary   *string
	Title     *string
	Volume    *int32
	Writer    *string
}

type Page struct {
	Image *int32
	Type  string
}

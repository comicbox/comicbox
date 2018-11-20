package controller

type ComicRackBook struct {
	Genres    string
	Manga     string
	Number    float64
	Pages     []ComicRackPage `xml:"Pages>Page"`
	Penciller string
	Series    string
	Summary   string
	Title     string
	Volume    int
	Writer    string
}

type ComicRackPage struct {
	Image int
	Type  string
}

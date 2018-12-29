package cbz

import (
	"archive/zip"
	"fmt"
	"sort"
	"strings"
)

func ZippedImages(file string) ([]*zip.File, error) {
	// Open a zip archive for reading.
	reader, err := zip.OpenReader(file)
	if err != nil {
		return nil, fmt.Errorf("error opening zip: %v", err)
	}

	sort.Slice(reader.File, func(i, j int) bool {
		return strings.Compare(reader.File[i].Name, reader.File[j].Name) < 0
	})

	imageFiles := reader.File[:0]
	for _, x := range reader.File {
		lowerName := strings.ToLower(x.Name)
		if strings.HasSuffix(lowerName, ".jpg") ||
			strings.HasSuffix(lowerName, ".jpeg") ||
			strings.HasSuffix(lowerName, ".png") ||
			strings.HasSuffix(lowerName, ".bmp") ||
			strings.HasSuffix(lowerName, ".gif") ||
			strings.HasSuffix(lowerName, ".tiff") {
			imageFiles = append(imageFiles, x)
		}
	}
	return imageFiles, nil
}

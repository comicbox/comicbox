package anilist

import (
	"context"

	"github.com/Yamashou/gqlgenc/client"
)

//go:generate gqlgenc

func (c *Client) UpdateProgress(ctx context.Context, mediaID int, progress *float64, progressVolumes *int32, httpRequestOptions ...client.HTTPRequestOption) (*SaveMediaListEntryPayload, error) {
	vars := map[string]interface{}{
		"mediaId": mediaID,
	}

	if progress != nil {
		vars["progress"] = int(*progress)
	}
	if progressVolumes != nil {
		vars["progressVolumes"] = int(*progressVolumes)
	}

	var res SaveMediaListEntryPayload
	if err := c.Client.Post(ctx, SaveMediaListEntryQuery, &res, vars, httpRequestOptions...); err != nil {
		return nil, err
	}

	return &res, nil
}

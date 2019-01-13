package controller

import (
	"fmt"
	"net/http"

	"github.com/comicbox/comicbox/comicboxd/app/pubsub"
	"github.com/comicbox/comicbox/comicboxd/errors"
	"github.com/gorilla/websocket"
)

type push struct {
	PubSub *pubsub.PubSub
}

var Push = &push{
	PubSub: pubsub.New(),
}

func (p *push) Message(format string, a ...interface{}) {
	p.PubSub.Publish(map[string]string{
		"message": fmt.Sprintf(format, a...),
	})
}

func (p *push) Error(format string, a ...interface{}) {
	p.PubSub.Publish(map[string]string{
		"message": fmt.Sprintf(format, a...),
		"error":   fmt.Sprintf(format, a...),
	})
}

func (p *push) Sub(w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	errors.Check(err)

	psID := p.PubSub.Subscribe(func(data interface{}) {
		conn.WriteJSON(data)
	})

	conn.SetCloseHandler(func(code int, text string) error {
		p.PubSub.Unsubscribe(psID)
		return nil
	})

}

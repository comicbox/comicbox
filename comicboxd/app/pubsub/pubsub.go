package pubsub

import (
	"sync"
)

type PubSub struct {
	subs   *sync.Map
	subNum int64
}

type Subscriber func(data interface{})

func New() *PubSub {
	return &PubSub{
		subs:   &sync.Map{},
		subNum: 0,
	}
}

func (ps *PubSub) Publish(data interface{}) {
	ps.subs.Range(func(_, sub interface{}) bool {
		sub.(Subscriber)(data)
		return true
	})
}

func (ps *PubSub) Subscribe(sub Subscriber) int64 {
	ps.subNum++
	ps.subs.Store(ps.subNum, sub)
	return ps.subNum
}

func (ps *PubSub) Unsubscribe(id int64) {
	ps.subs.Delete(id)
}

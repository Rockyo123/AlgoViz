package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Message struct {
	Type  string
	Event string
	Data  struct {
		Algo string
		Vals []int
	}
}

func WebsocketHandler(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println("error upgrading to websocket: ", err)
		return err
	}
	defer ws.Close()

	for {

		// Read
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		fmt.Printf("Received: %s\n", msg)
		var message Message
		if err := json.Unmarshal(msg, &message); err != nil {
			log.Println("error unmarshalling message: ", err)
			continue
		}

		var returnVal = WebsocketRouter(message)
		jsonResponse, err := json.Marshal(returnVal)
		if err != nil {
			log.Println("Error marshaling return value to JSON:", err)
		}
		// Write
		err = ws.WriteMessage(websocket.TextMessage, jsonResponse)
		if err != nil {
			log.Println("Error writing message:", err)
			break
		}

	}
	return nil
}

func WebsocketRouter(message Message) string {
	var ret = ""
	switch message.Type {
	case "sorting":
		ret = SortingRouter(message)
	default:
		log.Println("what is this")
	}
	return ret
}

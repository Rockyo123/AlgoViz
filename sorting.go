package main

import "log"

type sortingHandler struct {
	Data []int
}

func (sh *sortingHandler) InitializeSortingHandler(data []int) string {
	currentArr = &sortingHandler{
		Data: data,
	}
	log.Println("initilaizing sorting handler: ", currentArr.Data)
	return "initialized sorting handler"
}

func (sh *sortingHandler) nextSortingStep() string {
	return "next sorting step"
}

var currentArr *sortingHandler

func SortingRouter(message Message) string {
	print("rocky debug; in sortging handler: ")
	switch message.Event {
	case "_init":
		return currentArr.InitializeSortingHandler(message.Data.Vals)

	case "next_step":
		return currentArr.nextSortingStep()
	}
	log.Println("in sorting hanDler")
	return "in sorting handler"
}

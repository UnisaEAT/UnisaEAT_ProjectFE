import React from 'react'
import "../App.css"
import {Container} from "react-bootstrap";
export function VisualizzazionePersonale () {
    return (
        <Container>
            <div className="max-w-sm mx-auto md:max-w-lg">
                <div className="w-full">
                    <ul className="px-0">
                        <li className="border bg-white list-none rounded-sm px-3 py-3 cursor-pointer hover:text-white hover:bg-blue-600"
                            style='border-bottom-width:0'>List Item 1
                        </li>
                        <li className="border bg-white list-none rounded-sm px-3 py-3 cursor-pointer hover:text-white hover:bg-blue-600"
                            style='border-bottom-width:0'>List Item 2
                        </li>
                        <li className="border bg-white list-none rounded-sm px-3 py-3 cursor-pointer hover:text-white hover:bg-blue-600"
                            style='border-bottom-width:0'>List item 3
                        </li>
                        <li className="border bg-white list-none rounded-sm px-3 py-3 cursor-pointer hover:text-white hover:bg-blue-600"
                            style='border-bottom-width:0'>List Item 4
                        </li>
                        <li className="border bg-white list-none rounded-sm px-3 py-3 cursor-pointer hover:text-white hover:bg-blue-600">List
                            Item 5
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
)
}
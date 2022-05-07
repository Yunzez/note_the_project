import React from 'react'
import { Link } from 'react-router-dom'

export function RenderHome() {
    return (
        <div className=' main ms-3'>
            <h1>Version: Alpha 1.0.3</h1>
            <h5>Current avaliable funtion:</h5>
            <ul class="list-group mb-3">
                <li class="list-group-item">Create pages (server updated)</li>
                <li class="list-group-item">Create columns within pages(server updated)</li>
                <li class="list-group-item">create widget within columns (server updated)</li>
                <li class="list-group-item">adding tooltip within widget (no server update)</li>
            </ul>
            <p>Tooltips:</p>
            <ul class="list-group mb-3">
                <li class="list-group-item">Textbox creation with click editing</li>
                <li class="list-group-item">Todo list creation with click editing (progress bar unfinish)</li>
                <li class="list-group-item">Generate webpage bookmark (style/error handling unfinish)</li>
                <li class="list-group-item">Generate music tooltip (style/error handling/playable unfinish)</li>
                <li class="list-group-item">Generate calendar tooltip (style unfinish)</li>
            </ul>

            <h5>Priority bug focus:</h5>
            <ul class="list-group mb-3">
                <li class="list-group-item">User login detection unfinish</li>
                <li class="list-group-item">Page with same id cannot open after refresh (refetch from server)</li>
            </ul>

            <h5>Priority functionality focus:</h5>
            <ul class="list-group mb-3">
                <li class="list-group-item">Music/web popup</li>
                <li class="list-group-item">Render cover component</li>
            </ul>
        </div>

    )
}

export default RenderHome

import * as React from 'preact';
import { Find } from 'js/models/book'
import * as s from 'css/home.scss'

Find("cb58f0e6-353d-43c1-9862-59fe43a572ce").then(book => console.log(book))

React.render((
    <div class={s.test}>test</div>
), document.getElementById("app"));
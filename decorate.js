
document.body.innerHTML = `

<head>
	<meta charset="utf-8"/>
	<title>The Intergalactic Journal of Science</title>
	<style>
		body {
			display: grid;
			justify-content: center;
			
			padding-top: 32px;
			padding-bottom: 32px;
			
			background-image: url("/background.png");
			background-attachment: fixed;
		}
		
		#content-display {
			width: 900px;
			padding-top: 32px;
			padding-bottom: 32px;
			padding-left: 32px;
			padding-right: 32px;
			
			background-color: white;
			
			font-family: serif;
			line-height: 150%;
		}
		
		.nav-link {
			color: inherit;
			text-decoration: none;
			text-align: center;
		}
	</style>
</head>

<body>
	<header style="color: white; text-align: center;">
		<h1><a class="nav-link" href="/index.html">The Intergalactic Journal of Science</a></h1>
	</header>
	
	<nav style="color: white; display: flex; font-weight: bold; justify-content: center; padding-bottom: 32px;">
		<a class="nav-link" href="/entries.html" style="padding-right: 28px;">Entries</a>
		<a class="nav-link">Newest</a>
	</nav>
	
	<div id="content-display"></div>
</body>

`;

document.getElementById("content-display").innerHTML += document.getElementById("content").innerHTML;

function apply_parallax() {
	var scroll = window.scrollY;
	document.body.style["background-position-y"] = (-scroll * 0.1).toString() + "px";
}

apply_parallax();

window.addEventListener("scroll", function() {
	apply_parallax();
});

// Custom elements

class HeaderElement extends HTMLElement {
	static get observedAttributes() { return ["title", "date"]; }
	
	title = "";
	date = "";
	
	constructor() {
		super();
	}
	
	connectedCallback() {
		//this.innerHTML = `<header style="text-align: center;"><h1 id="header-title"></h1><h3 id="header-date"></h3></header>`;
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if (name == "title") this.title = newValue;
		else if (name == "date") this.date = newValue;
		
		this.innerHTML = `<header style="text-align: center;"><h1 id="header-title">` + this.title + `</h1><h3 id="header-date">` + this.date + `</h3><hr/></header>`;
	}
}

customElements.define("header-module", HeaderElement);

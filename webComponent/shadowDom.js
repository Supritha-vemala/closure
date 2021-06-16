let temp = document.createElement("template");
temp.innerHTML = `
<link rel="stylesheet" href="./node_modules/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="./starStyle.css"> 
<div class="fa inner" id="starDiv">
</div>
`;
class demo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(temp.content.cloneNode(true));
    this.render()
    
  }

  static get observedAttributes(){
    return ["rating"]
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "rating") {
      console.log(oldVal)
      console.log(newVal)
      this.render()
    }
  }

  render(){
    let rating = this.getAttribute("rating");
    let newVal =parseFloat(rating) * 15;
    this.shadowRoot.querySelector("#starDiv").style.width = `${newVal}px`;
  }
}

window.customElements.define("star-rating", demo);

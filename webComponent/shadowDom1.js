fetch("./templete.html")
.then((response)=>response.text())
.then((data)=>myComponent(data))

function myComponent(data){
    let temp = document.createElement("template");
    temp.innerHTML=data
    class demo extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          this.shadowRoot.appendChild(temp.content.cloneNode(true));
          
        }
      
        static get observedAttributes(){
          return ["rating"]
        }
        attributeChangedCallback(name, oldVal, newVal) {
          if (name === "rating") {
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
}

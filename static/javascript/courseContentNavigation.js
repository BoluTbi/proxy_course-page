

export default class ContentNav{
    constructor(el, currSection){
        this.DOM = {el: el, cSec: currSection};
        this.contentCode;
        this.DOM.el.classList.length > 1 ? this.contentCode = this.DOM.el.classList[1]: this.contentCode = this.DOM.el.classList[0];
        this.initEvt();
    }
    initEvt()
    {
        this.DOM.el.addEventListener('click',()=>{this.changeContent();});
    }

    async fetchHtml()
    {
        const promise = new Promise((resolve,reject)=>{

            fetch('../index.html',{
                method: "GET",
                mode: "cors",
                credentials: 'same-origin',
                headers: {
                    'Content-Type':'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(response =>{
                return response.text();
            })
            .then(function(html){
                
                const parse = new DOMParser();
                const doc = parse.parseFromString(html, 'text/html');
                resolve(doc);
                
            })
            .catch(err => reject(err));


        });

        const docDta = await promise;

        return docDta;
    

    }
    changeContent()
    {
        this.fetchHtml().then((data)=>{
            const sectionNode = document.querySelector('section');
            sectionNode.removeChild(this.DOM.cSec);
            sectionNode.appendChild(data.querySelector('.overview-content'));

            
        });
        
        
    }
}
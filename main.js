axios.get('http://localhost:3000/cats')
  .then(result => {
    const cats = result.data.data
    console.log(cats)
    const string = ''
    let holder = document.querySelector('ul')
    cats.forEach(cat => {
      let lineItem = document.createElement('li')
      lineItem.innerHTML = cat.name
      holder.appendChild(lineItem)
    })
  })
  .catch(err => {
    console.log('Do not worry, everything is fine.')
  })



createButton = document.getElementById('posts-create')
//Add an event listener to the create new cat button
createButton.addEventListener('click', createForm)


function createForm(){
  //On click, show a form on the page to create a new cat
  newForm = document.createElement('form')
  newForm.setAttribute('id', 'cat-form')
  newForm.innerHTML = `<label for = "cat-name">Cat Name</label><br><input type = "text" name="cat-name" id="cat-name" placeholder="what is your cat's name?"><br><input type = 'submit' class="btn btn-primary">`

  let formContainer = document.getElementById('form-container')
  formContainer.appendChild(newForm)

  buttonContainer = document.getElementById('button-container')
  buttonContainer.removeChild(createButton)


  newForm = document.getElementById('cat-form')
  newForm.addEventListener('submit', function(event){
    event.preventDefault()
    let catName = document.getElementById('cat-name')

    //On form submit, post a new cat to our Cats API
    axios.post('http://localhost:3000/cats', {name: catName.value})
      .then(result => {
        const newCat = result.data.data
        let items = document.createElement('li')
        //On form submit, add to the list of cats on the page
        items.innerHTML = newCat.name
        document.querySelector('ul').appendChild(items)
      })

    //On form submit, hide the form and clear the input
    formContainer.removeChild(newForm)
    buttonContainer.innerHTML = `<button id="posts-create" class="btn btn-primary">Create a New Kitten</button>`

    createButton = document.getElementById('posts-create')
    createButton.addEventListener('click', createForm)
  })
}

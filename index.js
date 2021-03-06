
const baseURL = 'https://randomuser.me/api/'
let usersProfile = document.getElementById('root')
let popover = document.createElement('div')
let overflow = document.createElement('div')
let container = document.createElement("div");
overflow.classList.add('overflow')
popover.classList.add('popover')
document.body.append(popover)
document.body.append(overflow)
usersProfile.appendChild(container)
let profPage = null

const initialParams = {
  results: {key:"results", value: 6},
  page: {key: 'page', value: 1}
}

const getList = (params = initialParams) => {

  const {results, page} = params

  fetch(`${baseURL}?${results.key}=${results.value}&${page.key}=${page.value}`)
  .then(response => response.json())
  .then(function(data) {
  
      console.log(data)
  
      drawItems(data)
    });
}



  function drawItems (data) {
    for ( i = 0; i < data.results.length; i++ ) {
      //Parsing Profile Info
      const usersTitle = data.results[i]['name']['title']
      const usersFirst = data.results[i]['name']['first']
      const usersLast = data.results[i]['name']['last']
      const usersMail = data.results[i]['email']
      const usersNumber = data.results[i]['cell']
      //Parsing Profile Image
      const usersImg = data.results[i]['picture']['medium']
      //Parsing Profile Location
      const usersCountry = data.results[i]['location']['country']
      const usersCity = data.results[i]['location']['city']
      const usersState = data.results[i]['location']['state']
      const usersStreet = data.results[i]['location']['street']['name']
      const usersHomeNumber = data.results[i]['location']['street']['number']

      // console.log(usersStreet);

      let div = document.createElement('div')
      let divInner = document.createElement('div')
      
      //Parsing Users' Image
      let img = document.createElement('img')
      img.src = usersImg
    
      //Parsing Users' Title FirstName and LastName
      let usersFIO = document.createElement('h3')
      usersFIO.classList.add('fio')
      usersFIO.innerHTML = usersTitle + '. ' + usersFirst + ' ' + usersLast
      
      divInner.appendChild(usersFIO)

       //Parsing Users' Country
       let country = document.createElement('span')
       country.innerHTML = '<b>Country: </b>' + usersCountry
       divInner.appendChild(country)

       //Parsing Users' City
       let city = document.createElement('span')
       city.innerHTML = '<b>City: </b>' + usersCity
       divInner.appendChild(city)
 
       //Parsing Users' State 
       let state = document.createElement('span')
       state.innerHTML = '<b>State: </b>' + usersState
       divInner.appendChild(state)
 
       //Parsing Users' Address
       let address = document.createElement('span')
       address.innerHTML = '<b>Address: </b>' + usersStreet + ' ' + usersHomeNumber
       divInner.appendChild(address)

      //Parsing Users' Phone Number
      let spanNumber = document.createElement('span')
      spanNumber.innerHTML = '<b>Phone Number: </b>' + usersNumber
      divInner.appendChild(spanNumber)

      //Parsing Users' e-mail
      let paragraph = document.createElement('span')
      paragraph.innerHTML = '<b>e-mail: </b>' + usersMail
      divInner.appendChild(paragraph)

      //Preview Button 
      let button = document.createElement('button')
      button.classList.add('btn')
      button.innerHTML = 'preview'
      button.setAttribute('email', usersMail)
      divInner.appendChild(button)

      createEvent(button, data.results)

      div.classList.add('profPage')
      img.classList.add('profImg')
      divInner.classList.add('profile-content')
      div.append(img)
      div.append(divInner)
      container.append(div)
    }
    profPage = document.querySelectorAll('.profPage')
  }

  function createEvent(button, data) {
    const email = button.getAttribute('email')
    button.addEventListener('click', () => {
      const singleItem = data.filter(item => item.email === email)[0]
      
      console.log(singleItem);
      let popoverHeading = document.createElement('div')
      popoverHeading.innerHTML = 'Detail information'
      let closeBtn = document.createElement('button')
      closeBtn.innerHTML = 'X'
      popoverHeading.classList.add('popover-heading');
      let popoverInner = document.createElement('div')
      popoverInner.classList.add('popoverInner')
      
      //Profile Item
      const {title, first, last} = singleItem.name
      const h3 = document.createElement('h3')
      h3.innerHTML = `${title}. ${first} ${last}`
      popoverInner.appendChild(h3)

      //Profile Image 
      const {picture} = singleItem.picture
      const profileImg = document.createElement('img')
      profileImg.src = singleItem.picture.large
      const popoverImg = document.createElement('div')
      popoverImg.appendChild(profileImg)
      popoverInner.appendChild(popoverImg)

      //Profile Country
      const {country} = singleItem.location
      const countrySpan = document.createElement('span')
      countrySpan.innerHTML = `<b>Country:</b> ${country}`
      popoverInner.appendChild(countrySpan)

      //Profile City 
      const {city} = singleItem.location
      const citySpan = document.createElement('span')
      citySpan.innerHTML = `<b>City:</b> ${city}`
      popoverInner.appendChild(citySpan)

      //Profile State
      const {state} = singleItem.location
      const stateSpan = document.createElement('span')
      stateSpan.innerHTML = `<b>State:</b> ${state}`
      popoverInner.appendChild(stateSpan)

      //Profile Address
      const {name, number} = singleItem.location.street
      const street = document.createElement('span')
      street.innerHTML = `<b>Address:</b> ${name} ${number}`
      popoverInner.appendChild(street)

      //Profile Phone Number
      const {phone} = singleItem
      const phoneNumb = document.createElement('span')
      phoneNumb.innerHTML = `<b>Phone Number:</b> ${phone}`
      popoverInner.appendChild(phoneNumb)

      // //Profile e-mail
      // const {email} = singleItem.email
      // const emailSpan = document.createElement('span')
      // emailSpan.innerHTML = `<b>e-mail:</b> ${email}`
      // popoverInner.appendChild(emailSpan)

      closeBtn.addEventListener('click', () => {
        overflow.classList.remove('active')
        popover.classList.remove('active')
        popover.removeChild(popoverInner)
        popover.removeChild(popoverHeading)
      })
  
      overflow.classList.add('active')
      popover.classList.add('active')
      popoverHeading.appendChild(closeBtn)
      popover.appendChild(popoverHeading)
      popover.appendChild(popoverInner)
    })
  }

//Pagination Pages
let paginationDiv = document.createElement('div')
paginationDiv.classList.add('paginationDiv')

//First Page
let paginationBtn1 = document.createElement('button')
paginationBtn1.classList.add('pageBtn')
paginationBtn1.setAttribute('value', 1)
paginationBtn1.setAttribute('btnType', 'prev')
paginationBtn1.innerHTML = 'prev'

//Second Page
let paginationBtn2 = document.createElement('button')
paginationBtn2.classList.add('pageBtn')
paginationBtn2.innerHTML = 'next'
paginationBtn2.setAttribute('value', 1)
paginationBtn2.setAttribute('btnType', 'next')

//Third Page
// let paginationBtn3 = document.createElement('button')
// paginationBtn3.classList.add('pageBtn')
// paginationBtn3.innerHTML = '3'

document.body.append(paginationDiv)
paginationDiv.appendChild(paginationBtn1)
paginationDiv.appendChild(paginationBtn2)
// paginationDiv.appendChild(paginationBtn3)
getList()

const paggi_btn = document.querySelectorAll('.pageBtn')

console.log(profPage);

for(let i = 0; i < paggi_btn.length; i++) {
  paggi_btn[i].addEventListener('click', () => {
    const btnType = paggi_btn[i].getAttribute('btnType')
    const value = Number(paggi_btn[i].getAttribute('value'))
    
    if(btnType === 'prev' && value !== 1){
      const newParams = {...initialParams, page: {...initialParams.page, value: (value - 1)}}
      
      for(let j = 0; j < paggi_btn.length; j++) {
        paggi_btn[j].setAttribute('value', value - 1)
      }
      for(let j = 0; j < profPage.length; j++) {
        usersProfile.removeChild(profPage[j])
      }
      // getList(newParams)
    }

    if(btnType === 'next') {
      const newParams = {...initialParams, page: {...initialParams.page, value: (value + 1)}}
      for(let j = 0; j < paggi_btn.length; j++) {
        paggi_btn[j].setAttribute('value', value + 1)
      }
      for(let j = 0; j < profPage.length; j++) {
        usersProfile.removeChild(profPage[j])
      
      }
      // getList(newParams)
    }
  })
}
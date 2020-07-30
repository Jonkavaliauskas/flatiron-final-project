function qs(selector) {
  return document.querySelector(selector)
}

function ce(element) {
  return document.createElement(element)
}


let dropDownProfile = qs("button#dropdownprofile")
dropDownProfile = qs("button#dropdownprofile")
dropDownProfile.addEventListener("click", () => {
  console.log("profilesdropdown")
  lowerBodyStuff.innerHTML = ""

  function fetchProfile() {
    fetch("http://localhost:3000/api/v1/profiles/" + JSON.parse(localStorage.userProfile).id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}` // sending auth token
        }
      })
      .then(res => res.json())
      .then(profile => makeProfile(profile))
  }

  function makeProfile(profile) {


    let jDiv = ce("div")
    jDiv.className = "card shadow mb-4"
    let h5 = ce("h5")
    h5.innerText = "Profile Name: " + profile.name


    let uni = ce("h5")
    uni.innerText = "Profile University: " + profile.university

    let bio = ce("h5")
    bio.innerText = "Profile Bio: " + profile.bio

    let ul = ce("ul")

    function editProject(project){
      const checkExists = document.getElementById("edit-form-container-" + project.id)
      console.log(checkExists)
      if (checkExists){
        
        return
      }
      console.log(project)
      console.log(lowerBodyStuff)
      const editFormContainer = ce("div")
      editFormContainer.id = "edit-form-container-" + project.id

      const closeBtn = ce("button")
      closeBtn.innerText = "close form"
      closeBtn.addEventListener("click", () => {
        editFormContainer.remove()
      })
        const newProjectForm = ce("form")
        const formGroup = ce("div")
        formGroup.className = "form-group"

        const inputDiv = ce("div")
        inputDiv.className = "input-group mb-3"
        inputDiv.innerHTML = '<input name="project-title" type="text" class="form-control" id="new-title" value= "' + project.title + '">'

        const inputDiv2 = ce("div")
        inputDiv2.className = "input-group mb-3"
        inputDiv2.innerHTML = '<input name="project-description" type="text" class="form-control" id="new-description" value= "' + project.description + '">'

        const inputDiv3 = ce("div")
        inputDiv3.className = "input-group mb-3"
        inputDiv3.innerHTML = '<input name="project-year" type="number" class="form-control" id="new-year" value= "' + project.year + '">'

        const inputDiv5 = ce("div")
        inputDiv5.className = "input-group mb-3"
        const updateProjectBtn = ce("button")
        updateProjectBtn.id = "update-project-" + project.id 
        updateProjectBtn.type = "submit"
        updateProjectBtn.className = "btn btn-light"
        updateProjectBtn.innerText = "Update Project"
        updateProjectBtn.addEventListener("click", () => {
          event.preventDefault()
          console.log("update", project.id)
          function updateThisProject(project){
            const p = qs("p#project-item-" + project.id)
            p.innerText = "Project Title: " + project.title + ", Project Year: " + project.year + ", Project Description: " + project.description

          }

          let configObj = {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email: JSON.parse(localStorage.currentUser).email,
                    title: newProjectForm[0].value,
                    description: newProjectForm[1].value,
                    year: newProjectForm[2].value,
                    img: newProjectForm[3].value
                  })
              }
    
              fetch("http://localhost:3000/api/v1/projects/" + project.id, configObj)
              .then(res => res.json())
              .then(updated_project => {
                updateThisProject(updated_project)
              })

        })  
        inputDiv5.append(updateProjectBtn)

        formGroup.append(inputDiv, inputDiv2, inputDiv3, inputDiv5)
        newProjectForm.append(formGroup)
        editFormContainer.append(newProjectForm, closeBtn)
        lowerBodyStuff.append(editFormContainer)
      
    }  

    profile.projects.forEach(project => {
      console.log(project)
      const li = ce("li")
      const p = ce("p")
      p.id = "project-item-" + project.id
      p.innerText = "Project Title: " + project.title + ", Project Year: " + project.year + ", Project Description: " + project.description
      li.append(p)
      let dltBtn = ce("button")
      dltBtn.className = "btn-danger"
      dltBtn.innerText = "x"

      let editBtn = ce("button")
      editBtn.innerText = "Edit Project"
      editBtn.style = "margin-left: 5%; margin-bottom: 25px; margin-top: 25px"

      editBtn.addEventListener("click", function () {
        event.preventDefault()
        editProject(project)
        
      })

      dltBtn.addEventListener("click", function () {
        fetch("http://localhost:3000/api/v1/projects/" + project.id, {
                  method: "DELETE"
              })
              .then(() => li.remove())
      })
      li.append(dltBtn, editBtn)
      ul.append(li)
    })
  
    jDiv.append(h5, uni, bio, ul)
    lowerBodyStuff.append(jDiv)

  }


  fetchProfile()

  const projectList = ce("ul")
  let addProfileBtn = false

  const addBtn = ce("button")
  addBtn.id = "add-project"
  addBtn.className = "btn btn-light"
  addBtn.innerText = "Add Project"
  addBtn.style = "margin-left: 5%; margin-bottom: 25px; margin-top: 25px"

  const formContainer = ce("div")
  formContainer.id = "form-container"
  formContainer.style.display = "none"

  

  addBtn.addEventListener("click", () => {
    formContainer.innerHTML = ""
    formContainer.style = "margin: 25px"


    if (!addProfileBtn) {
      console.log(addProfileBtn)
      addBtn.innerText = "Hide Project Form"
    } else {
      console.log(formContainer)
      addBtn.innerText = "Create Project"
      addProfileBtn = !addProfileBtn
      return
    }
    const newProjectForm = ce("form")
    const formGroup = ce("div")
    formGroup.className = "form-group"

    const inputDiv = ce("div")
    inputDiv.className = "input-group mb-3"
    inputDiv.innerHTML = '<input name="project-title" type="text" class="form-control" id="new-title" placeholder="Project Title">'

    const inputDiv2 = ce("div")
    inputDiv2.className = "input-group mb-3"
    inputDiv2.innerHTML = '<input name="project-description" type="text" class="form-control" id="new-description" placeholder="Project Description">'

    const inputDiv3 = ce("div")
    inputDiv3.className = "input-group mb-3"
    inputDiv3.innerHTML = '<input name="project-year" type="number" class="form-control" id="new-year" placeholder="Project Year">'

    const inputDiv4 = ce("div")
    inputDiv4.className = "input-group mb-3"
    inputDiv4.innerHTML = '<div class="custom-file"><input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"><label class="custom-file-label" for="inputGroupFile01">Upload Image</label></div>'

    const inputDiv5 = ce("div")
    inputDiv5.className = "input-group mb-3"
    inputDiv5.innerHTML = '<button id="sub" type="submit" class="btn btn-light">Add Project</button>'

    formGroup.append(inputDiv, inputDiv2, inputDiv3, inputDiv4, inputDiv5)
    newProjectForm.append(formGroup)
    formContainer.append(newProjectForm)
    lowerBodyStuff.append(formContainer)

    addProfileBtn = !addProfileBtn;
    newProjectForm.addEventListener("submit", (event) => {
      console.log("creatingproject")
      
      event.preventDefault()


      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.currentUser).email,
          title: newProjectForm[0].value,
          description: newProjectForm[1].value,
          year: newProjectForm[2].value,
          img: newProjectForm[3].value
        })
      }
      console.log(configObj)
      fetch("http://localhost:3000/api/v1/projects", configObj)
      .then(res => res.json())
      .then(project => {
        addProject(project)
        newProjectForm.reset()
      })
  
      function fetchProjects() {
        fetch("http://localhost:3000/api/v1/projects?sort=-created-at")
          .then(res => res.json())
          .then(projects => {
            projects = projects.filter(project => project.user.email == currentUser.email)
            showProjects(projects)} )
      }
  
  
      function showProjects(projects) {
        projects.forEach(project => addProject(project))
      }
  
      function addProject(project) {
        const li = ce("li")
        li.className = "wishCard"
  
        let blockquote = ce("blockquote")
        blockquote.className = "blockquote"
  
        const p = ce("p")
        p.className = "mb-0"
        p.innerText = project.title
  
        const img = ce("img")
        if (project.img === null) {
          img.src = ""
        } else {
          img.src = project.img
          blockquote.append(img)
        }
  
  
  
        const footer = ce("footer")
        footer.className = "blockquote-footer"
        footer.innerText = project.description
  
        let editBtn = ce("button")
        editBtn.innerText = "Edit Project"
  
        let dltBtn = ce("button")
        dltBtn.className = "btn-danger"
        dltBtn.innerText = "x"
  
        dltBtn.addEventListener("click", function () {
          fetch("http://localhost:3000/api/v1/projects/" + project.id, {
                    method: "DELETE"
                })
                .then(() => li.remove())
        })
  
  
  
        blockquote.append(p, footer)
        li.append(blockquote, dltBtn)
        projectList.append(li)
      }
  
      lowerBodyStuff.appendChild(projectList)
      fetchProjects()
  
  
    }) 
    
  })
  lowerBodyStuff.appendChild(addBtn)

  

  
  lowerBodyStuff.appendChild(addBtn)
  lowerBodyStuff.appendChild(projectList)

})


const logoutButton = qs("button#logoutjonas")
const aboutButton = qs("button#aboutsite")
const profilesButton = qs("button#profilesite")
const createProfileButton = qs("button#createprofile")
const deleteProfileButton = qs("button#deleteprofile")
const editProfileButton = qs("button#editprofile")
const html = qs("html")
const landingbody = html.innerHTML
const htmlHead = qs("head")
const mainContent = qs("div#content")
const lowerBodyStuff = qs("div#lowerbodystuff")

// took this from a bootstrap design, it would have taken too much time to replicate, so I cheated a little.
// however, notice that, elsewhere, I always manipulate the DOM using JS
loginBody = `<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>CodeMatch- Login</title>

<!-- Custom fonts for this template-->
<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

<!-- Custom styles for this template-->
<link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

<div class="container">

  <!-- Outer Row -->
  <div class="row justify-content-center">

    <div class="col-xl-10 col-lg-12 col-md-9">

      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
            <div class="col-lg-6">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                <form class="user" id="jonasloginform">
                  <div class="form-group">
                    <input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" name="password">
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox small">
                      <input type="checkbox" class="custom-control-input" id="customCheck">
                      <label class="custom-control-label" for="customCheck">Remember Me</label>
                    </div>
                  </div>
                  <button type="submit" id="loginjonas" class="btn btn-primary btn-user btn-block">
                    Login
                  </button>
                  <hr>
                  <a href="index.html" class="btn btn-google btn-user btn-block">
                    <i class="fab fa-google fa-fw"></i> Login with Google
                  </a>
                  <a href="index.html" class="btn btn-facebook btn-user btn-block">
                    <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                  </a>
                </form>
                <hr>
                <div class="text-center">
                  <a class="small" href="forgot-password.html">Forgot Password?</a>
                </div>
                <div class="text-center">
                  <a id="createaccount" class="small">Create an Account!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</div>

<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="js/sb-admin-2.min.js"></script>

</body>`


// took this from a bootstrap design, it would have taken too much time to replicate, so I cheated a little.
// however, notice that, elsewhere, I always manipulate the DOM using JS
signUpBody = `<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>CodeMatch - Register</title>

  <!-- Custom fonts for this template-->
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

  <div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 id="formtitle" class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" id="profilejonas">
                <div class="form-group row">
                </div>
                <div class="form-group"  >
                  <input type="email" class="form-control form-control-user" id="InputEmail" placeholder="Email Address" name="email">
                </div>
                <div class="form-group row"  id = "profileform" >
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="password" class="form-control form-control-user" id="InputPassword" placeholder="Password" name="password">
                  </div>
                  <div class="col-sm-6">
                    <input type="password" class="form-control form-control-user" id="RepeatPassword" placeholder="Repeat Password" name="confirmpassword"> 
                  </div>
    
                </div>
                <button id="registertoprofile" class="btn btn-primary btn-user btn-block" type="submit">
                  Register Account
                </button>
                <hr>
                <a id="registerwithgoogle" href="index.html" class="btn btn-google btn-user btn-block">
                  <i class="fab fa-google fa-fw"></i> Register with Google
                </a>
                <a id="registerwithfacebook" href="index.html" class="btn btn-facebook btn-user btn-block">
                  <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                </a>
              </form>
              
              <div class="text-center">
                <a class="small" href="forgot-password.html">Forgot Password?</a>
              </div>
              <div class="text-center">
                <a class="small" href="login.html">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="js/sb-admin-2.min.js"></script>

</body>`






logoutButton.addEventListener("click", () => {
  console.log("logout")
  localStorage.clear()
  html.innerHTML = loginBody
  const loginButton = qs("button#loginjonas")
  const loginForm = qs("form#jonasloginform")
  loginForm.addEventListener("submit", () => {
    console.log("login")
    event.preventDefault()  
    const email = event.target.elements["email"]
    const password = event.target.elements["password"]
    console.log(email.value)
    console.log(password.value)
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo.token) {
          localStorage.token = userInfo.token
          html.innerHTML = landingbody
          

          localStorage.currentUser = JSON.stringify(userInfo)
          console.log(localStorage)
          dropDownProfile = qs("button#dropdownprofile")
          dropDownProfile.addEventListener("click", () => {
            console.log("profilesdropdown")
            html.innerHTML = "<body> <h1>" + JSON.parse(localStorage.currentUser).email + "  </h1> </body>"


          })
        } else {
          alert("no luck")
        }
      })
  })
  const createAccount = qs("a#createaccount")
  createAccount.addEventListener("click", () => {
    console.log("create account")
    html.innerHTML = signUpBody
    const formJonas = qs("form#profilejonas")

    formJonas.addEventListener("submit", (event) => {
      event.preventDefault()
      const email = event.target.elements["email"]
      const password = event.target.elements["password"]
      const confirmpassword = event.target.elements["confirmpassword"]
      console.log(email.value)
      console.log(password.value)
      console.log(confirmpassword.value)
      if (password.value === confirmpassword.value) {
        fetch("http://localhost:3000/api/v1/users", {
          method: "POST",
          headers: {

            "Content-type": "application/json"
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        })
          .then(res => res.json())
          .then(userInfo => {
            console.log(userInfo)
            if (userInfo.token) {
              localStorage.token = userInfo.token
              console.log(localStorage)
              html.innerHTML = loginBody
            }
          })
      } else {
        alert("passwords don't match :(")

      }
    })
  })

})




function renderProfileForm() {
  html.innerHTML = signUpBody
  const formJonas = qs("form#profilejonas")
  const profileForm = qs("div#profileform")
  const formTitle = qs("h1#formtitle")
  formTitle.innerText = "Create Profile!"
  const InputEmail = qs("input#InputEmail")
  const InputPassword = qs("input#InputPassword")
  const RepeatPassword = qs("input#RepeatPassword")
  InputEmail.type = "text"
  InputEmail.placeholder = "Name"
  InputEmail.name = "name"
  InputPassword.remove()
  RepeatPassword.remove()


  profileForm.appendChild(createProfileElement("university"))
  profileForm.appendChild(createProfileElement("bio"))
  profileForm.appendChild(createProfileElement("age", "number"))
  profileForm.appendChild(createProfileElement("image", "file"))
  profileForm.appendChild(createProfileElement("resume", "file"))

  const registerToProfile = qs("button#registertoprofile")
  registerToProfile.innerText = "Create Profile"

  const googlebutton = qs("a#registerwithgoogle")
  const facebookbutton = qs("a#registerwithfacebook")
  googlebutton.remove()
  facebookbutton.remove()
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createProfileElement(name, type = "text") {
  const Div = ce("div")
  Div.className = "col-sm-6 mb-3 mb-sm-0"
  const Input = ce("input")
  Input.type = type
  Input.placeholder = capitalizeFirstLetter(name)
  Input.name = name
  const Br = ce("br")
  Input.className = "form-control form-control-user"
  Div.appendChild(Input)
  Div.appendChild(Br)
  return Div
}
deleteProfileButton.addEventListener("click", () => {
  if (JSON.parse(localStorage.userProfile) !== null){
   
  fetch("http://localhost:3000/api/v1/profiles/" + JSON.parse(localStorage.userProfile).id, {
              method: "DELETE"
          })

        }  
        localStorage.removeItem("userProfile")             
})

createProfileButton.addEventListener("click", () => {

  console.log("createprofile")



  renderProfileForm()

  const profileForm = qs("div#profileform")
  const formJonas = qs("form#profilejonas")
  formJonas.addEventListener("submit", function () {
    event.preventDefault()
    const name = event.target.elements["name"]
    const university = event.target.elements["university"]
    const bio = event.target.elements["bio"]
    const age = event.target.elements["age"]
    const resume = event.target.elements["resume"]
    const image = event.target.elements["image"]

    console.log(name.value)
    console.log(university.value)
    console.log(bio.value)
    console.log(age.value)
    console.log(resume.value)
    console.log(image.value)

    let configObj = {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.currentUser).email,
        name: name.value,
        age: age.value,
        bio: bio.value,
        university: university.value,
        image: image.value,
        resume: resume.value
      })
    }

    fetch("http://localhost:3000/api/v1/profiles", configObj)
      .then(res => res.json())
      .then(profileInfo => {
        console.log(profileInfo)
        localStorage.userProfile = JSON.stringify(profileInfo)

      })
  })
})


function editProfileElement(name, value, type = "text") {
  const Div = ce("div")
  Div.className = "col-sm-6 mb-3 mb-sm-0"
  const Input = ce("input")
  Input.type = type
  Input.value = value
  Input.name = name
  
  const Br = ce("br")
  Input.className = "form-control form-control-user"
  Div.appendChild(Input)
  Div.appendChild(Br)
  return Div
}


function renderEditProfileForm() {
  html.innerHTML = signUpBody
  const formJonas = qs("form#profilejonas")
  const profileForm = qs("div#profileform")
  const formTitle = qs("h1#formtitle")
  formTitle.innerText = "Update Profile!"
  const InputEmail = qs("input#InputEmail")
  const InputPassword = qs("input#InputPassword")
  const RepeatPassword = qs("input#RepeatPassword")
  InputEmail.type = "text"
  InputEmail.placeholder = "Name"
  InputEmail.name = "name"
  InputPassword.remove()
  RepeatPassword.remove()


  const thisuser= JSON.parse(localStorage.userProfile)
  InputEmail.value = thisuser.name
  profileForm.appendChild(editProfileElement("university", thisuser.university))
  profileForm.appendChild(editProfileElement("bio", thisuser.bio))
  profileForm.appendChild(editProfileElement("age", thisuser.age, "number"))

  const editToProfile = qs("button#registertoprofile")
  editToProfile.innerText = "Update Profile"

  const googlebutton = qs("a#registerwithgoogle")
  const facebookbutton = qs("a#registerwithfacebook")
  googlebutton.remove()
  facebookbutton.remove()
}


editProfileButton.addEventListener("click", () => {

  console.log("editprofile")

  

  renderEditProfileForm()

  const formJonas = qs("form#profilejonas")
  formJonas.addEventListener("submit", function () {
    console.log("editing")
    event.preventDefault()
    const name = event.target.elements["name"]
    const university = event.target.elements["university"]
    const bio = event.target.elements["bio"]
    const age = event.target.elements["age"]
    const resume = event.target.elements["resume"]
    const image = event.target.elements["image"]

    console.log(name.value)
    console.log(university.value)
    console.log(bio.value)
    console.log(age.value)

    let configObj = {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: JSON.parse(localStorage.currentUser).email,
        name: name.value,
        age: age.value,
        bio: bio.value,
        university: university.value,
        
      })
    }

    fetch("http://localhost:3000/api/v1/profiles/" + JSON.parse(localStorage.userProfile).id, configObj)
      .then(res => res.json())
      .then(profileInfo => {
        console.log(profileInfo)
        localStorage.userProfile = JSON.stringify(profileInfo)

      })
  })
})


aboutButton.addEventListener("click", () => {
  console.log("about")
  html.innerHTML = landingbody
})


profilesButton.addEventListener("click", () => {
  console.log("profiles")
  lowerBodyStuff.innerHTML = ""
  htmlHead.innerHTML += `<link rel="stylesheet" href="index.css" />`
  
  let filterDiv = ce("div")
  filterDiv.id = "filter-div"

  let filterBtn = ce("button")
  filterBtn.id = "filter-button"
  filterBtn.innerText = "Filter by age>50: OFF"
  
  filterDiv.append(filterBtn)
  lowerBodyStuff.append(filterDiv)

  filterBtn.addEventListener("click", () => {
    event.preventDefault()
    console.log("filterBtnClicked")
    if(filterBtn.innerText == "Filter by age>50: OFF"){
        sortProfiles()
    }else{
        fetchProfiles()
    }
  })

  function sortProfiles(){
      lowerBodyStuff.innerHTML = ""
      fetch("http://localhost:3000/api/v1/profiles")
      .then(res => res.json())
      .then(profiles => {
        updatedProfileList = profiles.filter(profile => profile.age > "50")
        displayProfiles(updatedProfileList)
        filterBtn.innerText == "Filter by age>50: ON"
      })
  }

  function fetchProfiles() {
    fetch("http://localhost:3000/api/v1/profiles",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}` // sending auth token
        }
      })
      .then(res => res.json())
      .then(profiles => displayProfiles(profiles))
  }

  function displayProfiles(profiles) {
    profiles.forEach(profile => {
      makeProfile(profile)
    })
  }

  function makeProfile(profile) {

    let jDiv = ce("div")
    jDiv.className = "card shadow mb-4"
    let h5 = ce("h5")
    h5.innerText = profile.name

    let btn = ce("button")
    btn.className = "btn btn-primary"
    btn.innerText = "View Profile"

    let uni = ce("h5")
    uni.innerText = profile.university

    let age = ce("h5")
    age.innerText = "Age: " + profile.age


    jDiv.append(h5, uni, age, btn)
    lowerBodyStuff.append(jDiv)

  }


  fetchProfiles()

})




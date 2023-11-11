document.addEventListener("DOMContentLoaded", () => {

    // Basic homework 
    const URL = "https://jsonplaceholder.typicode.com/users";
    const usersList = document.querySelector("#directory .column ol");

    const fetchUsers = async () => {
        try {
            const resp = await fetch(URL);
            const users = await resp.json();
            return users;
        } catch (error) {
            console.log(error)
        }
    }

    const displayUsers = (users) => {
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = user.name;
            li.setAttribute("data-userid", user.id);
            li.addEventListener('click', (e) => {
                console.log(e.target)
                showUserDetails(e.target.getAttribute("data-userid"));
            })
            usersList.appendChild(li);
        })
    }

    (async () => {
        displayUsers(await fetchUsers());
    })();


    // Additional options

    const popup = document.querySelector(".popup");
    const closePopup = document.querySelector(".popup .ok")

    const getCurrentUser = async (userId) => {

        try {
            const resp = await fetch(URL + "/" + userId);
            const user = await resp.json();
            return user;
        } catch (err) {
            console.log(err);
        }
    }
    const showUserDetails = async (userId) => {

        const { id, name, username, email, phone, website, company: { name: companyName }, address: { zipcode, city, street, suite } } = await getCurrentUser(userId);
        const header = document.querySelector('.popup__infowindow__header');
        const content = document.querySelector('.popup__infowindow__content');

        if (name.length) {
            header.innerHTML = `<h2>User: ${name}</h2>`;
            content.innerHTML = `
            <p>User ID: ${id}</p>
            <p>User login: ${username}</p>
            <p>User email: ${email}</p>
            <p>User phone: ${phone}</p>
            <p>User company: ${companyName}</p>
            <div class="address">User address: 
            <p>Street: ${street}</p>
            <p>Suite: ${suite}</p>
            <p>City: ${city}</p>
            <p>Zip: ${zipcode}</p>
            
            </div>
            
            `;




            popup.classList.add('active');

        }




    }

    closePopup.addEventListener('click', (e) => {
        popup.classList.remove('active');
    })



})
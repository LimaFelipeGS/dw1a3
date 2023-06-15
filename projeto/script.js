/*=============================== HEADER BUTTONS ===============================*/

document.getElementById('button-header-profile').onclick = function() {accessProfile()};
function accessProfile() {
    var buttonOn = document.getElementById('button-header-profile');
    buttonOn.classList.add('on');
    var buttonOff = document.getElementById('button-header-controller');
    buttonOff.classList.remove('on');
    var sectionOn = document.getElementById('profile');
    sectionOn.classList.remove('hidden-content');
    var sectionOff = document.getElementById('controller');
    sectionOff.classList.add('hidden-content')
}

document.getElementById('button-header-controller').onclick = function() {accessController()};
function accessController() {
    var buttonOn = document.getElementById('button-header-controller');
    buttonOn.classList.add('on');
    var buttonOff = document.getElementById('button-header-profile');
    buttonOff.classList.remove('on');
    var sectionOn = document.getElementById('controller');
    sectionOn.classList.remove('hidden-content');
    var sectionOff = document.getElementById('profile');
    sectionOff.classList.add('hidden-content')
}

/*=============================== STORAGES ===============================*/

const StorageProfile = {
    get() {
        return JSON.parse(localStorage.getItem("Profiles")) || []
    },

    set(profileData) {
        localStorage.setItem("Profiles", JSON.stringify(profileData))
    }
}

const StorageWeight = {
    get() {
        return JSON.parse(localStorage.getItem("Weights")) || []
    },

    set(weightRegister) {
        localStorage.setItem("Weights", JSON.stringify(weightRegister))
    }
}

const StorageRegister = {
    get() {
        return JSON.parse(localStorage.getItem("Registers")) || []
    },

    set(registers) {
        localStorage.setItem("Registers", JSON.stringify(registers))
    }
}

const StorageExercise = {
    get() {
        return JSON.parse(localStorage.getItem("Exercises")) || []
    },

    set(exercises) {
        localStorage.setItem("Exercises", JSON.stringify(exercises))
    }
}

/*=============================== UTILS ===============================*/

const Utils = {
    formatStats(value) {
        value = Number(value) / 100
        return value
    },

    formatWeight(value) {
        value = Number(value.replace(/\,\./g, "")) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatTime(value) {
        if(value < 10) {
            value = `0:0${value}`
        } else {
        if(value < 60) {
            value = `0:${value}`
        } else {
            hour = Math.floor(value / 60)
            minutes = value % 60
            value = `${hour}:${minutes}`
        } }
        return value
    },

    formatName(value) {

        value = String(value)

        return value
    },

    dateToday() {
        const date = new Date()

        let currentDay = String(date.getDate()).padStart(2, '0')

        let currentMonth = String(date.getMonth()+1).padStart(2, '0')

        let currentYear = date.getFullYear()

        let currentDate = `${currentDay}/${currentMonth}/${currentYear}`

        return currentDate
    },

    formatDiff(value) {
        if(value < 0) {
            value = value * (-1)
            document.querySelector('#gain').classList.remove('hidden-content')
            document.querySelector('#loss').classList.add('hidden-content')
        } else {
            document.querySelector('#gain').classList.add('hidden-content')
            document.querySelector('#loss').classList.remove('hidden-content')
        }

        return value
    }
}

/*=============================== PROFILE BUTTONS ===============================*/
   /*============================ CREATE PROFILE ============================*/

const Profiles = {
    all: StorageProfile.get(),

    add(profile) {
        Profiles.all.push(profile),

        Weights.all.push(profile.weight)
        
        App.reload()
    },

    remove(index) {
        Profiles.all.splice(index, 1),

        Modal.close()

        App.reload()

        document.querySelector('#profile-buttons')
        .classList
        .add('hidden-content')

        document.querySelector('#profile-body')
        .classList
        .add('hidden-content')

        document.querySelector('#button-profile-new')
        .classList
        .add('button-profile-new')

        document.querySelector('#button-profile-new')
        .classList
        .remove('hidden-content')
    }
}

const DOM = {
    profileNameContainer: document.querySelector('.img-body'),
    addProfileName(profile, index) {
        const div = document.createElement('div')
        div.innerHTML = DOM.innerHTMLName(profile, index)
        div.setAttribute('class', 'name-body-image')
        div.dataset.index = index

        DOM.profileNameContainer.appendChild(div)
    },
    innerHTMLName(profile, index) {
        const profileName = `
            <p id="name" class="profile-name">${profile.name}</p>
            <img id="body-figure" src="./components/images/Corpo-Dark.png" alt="Figura Corpo Humano">
        `
        return profileName
    },

    profileStatsContainer: document.querySelector('.inner-profile-stats'),
    addProfileStats(profile, index) {
        const div = document.createElement('div')
        div.innerHTML = DOM.innerHTMLStats(profile, index)
        div.setAttribute('class', 'inner-profile-stats')
        div.dataset.index = index

        DOM.profileStatsContainer.insertBefore(div, null)
    },
    innerHTMLStats(profile, index) {
        const height = Utils.formatStats(profile.height)
        const weight = Utils.formatStats(profile.weight)

        const profileStats = `
            <div id="profile-height-div" class="height">
                <p class="stats-title">Altura</p>
                <p id="height" class="stats-body height">${height} m</p>
            </div>
            <div id="profile-weight-div" class="weight">
                <p class="stats-title">Peso Atual</p>
                <p id="weight" class="stats-body weight">${weight} kg</p>
                <button onclick="Modal.openUpdateWeight()" class="update weight">Atualizar Peso</button>
            </div>
        `
        return profileStats
    },

    clearProfile() {
        DOM.profileNameContainer.innerHTML = ""
        DOM.profileStatsContainer.innerHTML = ""
    }
}

        /*======================== HEIGHT LIMIT =========================*/

const profileMasks = {
    height(value) {
        return value
        .replace(/(\d{3})\d+?$/, "$1")
    }
}

document.querySelectorAll('input#new-profile-height').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = profileMasks.height(e.target.value)
    }, false)
})

     /*=============================== UPDATE WEIGHT =========================*/

const Weights = {
    all: StorageWeight.get(),

    add(weight) {
        Weights.all.push(weight)

        Profiles.all[0].weight = weight

        App.reload()
    },

    weightDiff() {
        let diff = 0

        diff = Weights.all[0] - Weights.all[Weights.all.length - 1]
        diff = Utils.formatStats(diff)
        diff = Utils.formatDiff(diff)

        return diff
    },
}

const WDOM = {
    WeightRegisterContainer: document.querySelector('#weight-history tbody'),

    addWeightRegister(weight, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = WDOM.innerHTMLWeight(weight, index)

        WDOM.WeightRegisterContainer.appendChild(tr)
    },

    innerHTMLWeight(weight, index) {
        const weightValue = Utils.formatStats(weight)

        const register = `
        <td>${weightValue} kg</td>
        <td>${Utils.dateToday()}</td>
        `
        return register
    },

    clearWeights() {
        WDOM.WeightRegisterContainer.innerHTML = ""
    },

    updateTable() {
        document.querySelector('.stats-body.gainloss').innerHTML = `${Weights.weightDiff()} kg`
    }
}

/*=============================== CONTROLLER BUTTONS ===============================*/
   /*=============================== ADD EXERCISE ===============================*/

const Exercises = {
    all: StorageRegister.get(),
    add(exercise) {
        Exercises.all.push(exercise),

        App.reload()
    },

    remove(index) {
        Exercises.all.splice(index, 1),

        App.reload()
    },

    totalRegisters() {
        let total = 0;

        Exercises.all.forEach(exercise => {
            total = total + 1;
        })

        return total;
    },

    totalTime() {
        let total = 0;

        Exercises.all.forEach(exercise => {
            total = total + Number(exercise.time);
        })

        return total;
    },

    totalDays() {
        let total = 0;

        Exercises.all.forEach(exercise => {
            let unique = [...new Set(registers.map(item => item.date))];

            total = unique.length
        })

        return total
    }
}

const EXDOM = {
    RegisterContainer: document.querySelector('#exercises-added tbody'),

    addRegister(exercise, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = EXDOM.innerHTMLRegisters(exercise, index)
        tr.dataset.index = index

        EXDOM.RegisterContainer.appendChild(tr)
    },

    innerHTMLRegisters(exercise, index) {
        const register = `
        <td>${exercise.name}</td>
        <td>${exercise.series}</td>
        <td>${exercise.reps}</td>
        <td>${exercise.time}min</td>
        <td>${exercise.date}</td>
        <td><img class="lixopng" onclick="Exercises.remove(${index})" src="./components/images/Lixo-Dark.png" alt="Excluir Exercício"></td>
        `
        return register
    },

    clearExercises() {
        EXDOM.RegisterContainer.innerHTML = ""
    },

    updateStats() {
        document.querySelector('.stats-body.te').innerHTML = Exercises.totalRegisters()
        document.querySelector('.stats-body.tt').innerHTML = Utils.formatTime(Exercises.totalTime())
        document.querySelector('.stats-body.td').innerHTML = Exercises.totalDays()
    }
}

  /*=============================== CREATE EXERCISE ===============================*/

const exercises = [
    "Bicicleta",
    "Abdominal",
    "Flexão",
    "Panturrilha"
]

// const baseEx = {
//     all: exercises
// }

const NewExercises = {
    all: exercises,
    add(exercise) {
        NewExercises.all.push(exercise),

        App.reload()
    },
}

const NEDOM = {
    ExerciseContainer: document.querySelector('select#exercises-list'),
    createExercise(exercise, index) {
        const option = document.createElement('option')
        option.innerHTML = `${exercise}`
        option.dataset.index = index
        // option.setAttribute('value', `${Utils.formatName(exercise.name)}`)

        NEDOM.ExerciseContainer.appendChild(option)
    },

    clearExercises() {
        NEDOM.ExerciseContainer.innerHTML = ""
    }
}

/*=============================== MODAL BUTTONS ===============================*/

const Modal = {
    openNewProfile() {
        document.querySelector('.overlay.create-profile')
        .classList
        .add('active');
    },

    openEditProfile() {
        document.querySelector('.overlay.edit-profile')
        .classList
        .add('active');
    },

    openUpdateWeight() {
        document
        .querySelector('.overlay.update-weight')
        .classList
        .add('active')
    },
    
    openConfirmDelete() {
        document
        .querySelector('.overlay.confirm-delete')
        .classList
        .add('active')
    },

    openAddExercise() {
        document
        .querySelector('.overlay.add-exercise')
        .classList
        .add('active')
    },

    openNewExercise() {
        document
        .querySelector('.overlay.create-exercise')
        .classList
        .add('active')
    },

    close() {
        let nodeList = document.querySelectorAll('.overlay');
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove('active');
        }
    },

    closeNewEx() {
        document
        .querySelector('.overlay.create-exercise')
        .classList
        .remove('active')
    }
}

/*=============================== FORMS ===============================*/

const NewProfileForm = {
    name: document.querySelector('input#new-profile-name'),
    height: document.querySelector('input#new-profile-height'),
    weight: document.querySelector('input#new-profile-weight'),

    getValues() {
        return {
            name: NewProfileForm.name.value,
            height: NewProfileForm.height.value,
            weight: NewProfileForm.weight.value
        }
    },

    validateFields() {
        const {name, height, weight} = NewProfileForm.getValues()

        if(name.trim() === "" || height.trim() === "" || weight.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {name, height, weight} = NewProfileForm.getValues()

        weight = Utils.formatWeight(weight)

        return {
            name,
            height,
            weight
        }
    },

    clearFields() {
        NewProfileForm.name.value = ""
        NewProfileForm.height.value = ""
        NewProfileForm.weight.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            NewProfileForm.validateFields()

            const profile = NewProfileForm.formatValues()

            Profiles.add(profile)

            NewProfileForm.clearFields()

            Modal.close()

            document.querySelector('#ov-create-profile .error')
            .classList
            .add('hidden-content')

            document.querySelector('#profile-buttons')
            .classList
            .remove('hidden-content')

            document.querySelector('#profile-body')
            .classList
            .remove('hidden-content')

            document.querySelector('#button-profile-new')
            .classList
            .add('hidden-content')

            document.querySelector('#button-profile-new')
            .classList
            .remove('button-profile-new')

        } catch (error) {
            document.querySelector('#ov-create-profile .error')
            .classList
            .remove('hidden-content')
        }
    }
}

const NewRegisterForm = {
    series: document.querySelector('input#add-exercise-series'),
    reps: document.querySelector('input#add-exercise-reps'),
    time: document.querySelector('input#add-exercise-time'),
    date: document.querySelector('input#add-exercise-date'),

    getExerciseName() {
        var select = document.getElementById('exercises-list');
        var exerciseSelected = select.options[select.selectedIndex].text;

        return exerciseSelected;
    },

    getValues() {
        return {
            name: NewRegisterForm.getExerciseName(),
            series: NewRegisterForm.series.value,
            reps: NewRegisterForm.reps.value,
            time: NewRegisterForm.time.value,
            date: NewRegisterForm.date.value
        }
    },

    validateFields() {
        const {name, series, reps, time, date} = NewRegisterForm.getValues()

        if(series.trim() === "" || reps.trim() === "" || time.trim() === "" || date.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {name, series, reps, time, date} = NewRegisterForm.getValues()

        date = Utils.formatDate(date)

        return {
            name,
            series,
            reps,
            time,
            date
        }
    },

    clearFields() {
        NewRegisterForm.series.value = ""
        NewRegisterForm.reps.value = ""
        NewRegisterForm.time.value = ""
        NewRegisterForm.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            NewRegisterForm.validateFields()

            const exercise = NewRegisterForm.formatValues()

            Exercises.add(exercise)

            NewRegisterForm.clearFields()

            Modal.close()

            document.querySelector('#ov-add-exercise .error')
            .classList
            .add('hidden-content')

            document.querySelector('#exercises-added thead')
            .classList
            .remove('hidden-content')
            
        } catch (error) {
            document.querySelector('#ov-add-exercise .error')
            .classList
            .remove('hidden-content')
        }
    }
}

const NewExerciseForm = {
    Exname: document.querySelector('input#exercise-name'),

    getValues() {
        return {
            Exname: NewExerciseForm.Exname.value
        }
    },

    validateFields() {
        const {Exname} = NewExerciseForm.getValues()

        if(Exname.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {Exname} = NewExerciseForm.getValues()

        Exname = Utils.formatName(Exname)

        return Exname
    },

    clearFields() {
        NewExerciseForm.Exname.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            NewExerciseForm.validateFields()

            const exercise = NewExerciseForm.formatValues()

            NewExercises.add(exercise)

            NewExerciseForm.clearFields()

            Modal.closeNewEx()

            document.querySelector('#ov-create-exercise .error')
            .classList
            .add('hidden-content')

        } catch (error) {
            document.querySelector('#ov-create-exercise .error')
            .classList
            .remove('hidden-content')
        }
    }
}

const UpdateWeightForm = {
    weight: document.querySelector('input#update-profile-weight'),

    getValues() {
        return {
            weight: UpdateWeightForm.weight.value
        }
    },

    validateFields() {
        const {weight} = UpdateWeightForm.getValues()

        if(weight.trim() === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    },

    formatValues() {
        let {weight} = UpdateWeightForm.getValues()

        weight = Utils.formatWeight(weight)

        return weight
    },

    clearFields() {
        UpdateWeightForm.weight.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            UpdateWeightForm.validateFields()

            const weight = UpdateWeightForm.formatValues()

            Weights.add(weight)

            UpdateWeightForm.clearFields()

            Modal.close()

            document.querySelector('#ov-update-weight .error')
            .classList
            .add('hidden-content')
            
        } catch (error) {
            document.querySelector('#ov-update-weight .error')
            .classList
            .remove('hidden-content')
        }
    }
}

/*=============================== APP ===============================*/

const App = {
    init() {
        Profiles.all.forEach((profile, index) => {
            DOM.addProfileName(profile, index),
            DOM.addProfileStats(profile, index)
        })

        Exercises.all.forEach((exercise, index) => {
            EXDOM.addRegister(exercise, index)
        })

        NewExercises.all.forEach((exercise, index) => {
            NEDOM.createExercise(exercise, index)
        })

        Weights.all.forEach((weight, index) => {
            WDOM.addWeightRegister(weight, index)
        })

        EXDOM.updateStats()

        WDOM.updateTable()

        StorageProfile.set(Profiles.all)
        StorageWeight.set(Weights.all)
        StorageRegister.set(Exercises.all)
        StorageExercise.set(NewExercises.all)

        NewExercises.all = StorageExercise.get()

    },

    reload() {
        DOM.clearProfile()
        EXDOM.clearExercises()
        NEDOM.clearExercises()
        WDOM.clearWeights()

        App.init()
    }
}

App.init()
window.addEventListener('load', () => {
  const instance = new window.Quill('#text-input', {
    theme: 'snow',
    modules: {
      syntax: true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
      ],
    },
  })

  instance.focus()

  // const button = document.querySelector('button[type="submit"]')
  const form = document.querySelector('form')
  const itemTypeTabs = document.getElementById('item-type-tab')

  const getCurrentItemType = () => {
    const navButtons = itemTypeTabs.querySelectorAll('button.nav-link')
    const [activeButton] = [...navButtons]
      .filter((button) => button.classList.contains('active'))
      .map((button) => button.id)

    return activeButton?.replace('-tab', '')
  }

  const getFormDataForType = (type, data) => {
    const formData = new FormData()
    formData.set('type', type)
    formData.set('created_at', new Date().toISOString())
    formData.set('last_updated', new Date().toISOString())

    if (type === 'text') {
      formData.set('raw', instance.root.innerHTML)
    }

    if (type === 'image') {
      formData.set('image', data.get('image'))
      formData.set('title', data.get('title'))
      formData.set('description', data.get('description'))
    }

    if (type === 'event') {
      console.log([...data.entries()])
      formData.set('title', data.get('event-title'))
      formData.set('description', data.get('event-description'))
      formData.set('address', data.get('event-address'))

      formData.set(
        'start_datetime',
        new Date(data.get('event-start-datetime')).toISOString()
      )

      formData.set(
        'end_datetime',
        new Date(data.get('event-end-datetime')).toISOString()
      )

      formData.set('image', data.get('event-image'))
    }

    return formData
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const type = getCurrentItemType()
    const formData = getFormDataForType(type, data)

    await fetch('/items', {
      method: 'POST',
      body: formData,
    }).then(() => {
      window.location = '/'
    })
  })
})

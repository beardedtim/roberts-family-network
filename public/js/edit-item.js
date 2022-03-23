window.addEventListener('load', () => {
  let instance = {
    root: {
      innerHTML: '',
    },
  }

  try {
    instance = new window.Quill('#text-input', {
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
  } catch (e) {
    console.warn(e)
    console.warn('Error while trying to initiate quill')
  }

  const form = document.querySelector('form')
  const deleteButton = document.getElementById('delete-item')

  const getCurrentItemType = () => form.dataset.type
  const getCurrentItemId = () => form.dataset.itemid
  const getCurrentStartTime = () => form.dataset.start
  const getCurrentEndTime = () => form.dataset.end

  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault()
    await fetch(`/items/${getCurrentItemId()}`, {
      method: 'DELETE',
    }).then(() => {
      window.location = '/'
    })
  })

  const getFormDataForType = (type, data) => {
    const formData = new FormData()

    formData.set('type', type)
    formData.set('created_at', new Date().toISOString())
    formData.set('last_updated', new Date().toISOString())

    if (type === 'text') {
      formData.set('raw', instance.root.innerHTML)
    }

    if (type === 'image') {
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

      if (data.has('event-image')) {
        formData.set('image', data.get('event-image'))
      }
    }

    return formData
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const type = getCurrentItemType()
    const formData = getFormDataForType(type, data)

    await fetch(`/items/${getCurrentItemId()}`, {
      method: 'PUT',
      body: formData,
    }).then(() => {
      window.location = '/'
    })
  })

  if (getCurrentItemType() === 'event') {
    const start = document.getElementById('event-start-datetime')
    const end = document.getElementById('event-end-datetime')

    const startTime = new Date(getCurrentStartTime())
    const endTime = new Date(getCurrentEndTime())

    const pad = (i) => (i < 10 ? `0${i}` : i)

    start.value = `${startTime.getFullYear()}-${pad(
      startTime.getMonth() + 1
    )}-${pad(startTime.getDate())}T${pad(startTime.getHours())}:${pad(
      startTime.getMinutes()
    )}`

    end.value = `${endTime.getFullYear()}-${pad(endTime.getMonth() + 1)}-${pad(
      endTime.getDate()
    )}T${pad(endTime.getHours())}:${pad(endTime.getMinutes())}`
  }
})

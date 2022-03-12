window.addEventListener('load', () => {
  const instance = new window.Quill('#text-input', {
    theme: 'snow',
  })

  instance.focus()

  const button = document.querySelector('button[type="submit"]')

  button.addEventListener('click', async (event) => {
    const data = instance.root.innerHTML

    await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          raw: data,
        },
        type: 'text',
      }),
    })
      .then((x) => x.json())
      .then(({ data, error }) => {
        if (error) {
          alert(
            'There was an issue validating. Please ensure you entered your correct username and the corresponding passcode from your authenticator app'
          )
        } else {
          window.location = '/'
        }
      })
  })
})

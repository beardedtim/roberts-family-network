window.addEventListener('load', () => {
  const form = document.querySelector('form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      username: formData.get('username'),
      code: formData.get('otp'),
    }

    await fetch('/users/otps/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

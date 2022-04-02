window.addEventListener('load', () => {
  const downloadButton = document.getElementById('add-to-calendar')
  const addToGoogleCalendar = document.getElementById('add-to-google-cal')

  if (addToGoogleCalendar) {
    const item = document.querySelector('.item')
    const data = JSON.parse(item.dataset.itemData)

    downloadButton.addEventListener('click', () => {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        data.data.title
      )}&dates=${data.data.start_datetime.replace(
        /\:|\-/g,
        ''
      )}/${data.data.end_datetime.replace(
        /\:|\-/g,
        ''
      )}&details=${encodeURIComponent(
        data.data.description || ''
      )}&location=${encodeURIComponent(
        data.data.address.replace('\n', ', ').replace('\r\n', ', ')
      )}`

      window.open(url)
    })
  }

  if (downloadButton) {
    const item = document.querySelector('.item')
    const data = JSON.parse(item.dataset.itemData)

    const ICS = window['ics-js']

    const cal = new ICS.VCALENDAR()

    cal.addProp('PRODID', 'McK-P')
    cal.addProp('VERSION', 2)

    const event = new ICS.VEVENT()
    event.addProp('UID', data.id)

    event.addProp('DTSTAMP', new Date(data.data.start_datetime), {
      VALUE: 'DATE-TIME',
    })

    event.addProp('DTEND', new Date(data.data.end_datetime), {
      VALUE: 'DATE-TIME',
    })

    event.addProp('DESCRIPTION', 'Some awesome description')

    cal.addComponent(event)

    downloadButton.addEventListener('click', () => {
      window.open('data:text/calendar;charset=utf8,' + cal.toString())
    })
  }
})

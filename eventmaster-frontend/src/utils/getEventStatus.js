export default function isEventOngoing(eventStringDate, startTime, endTime) {
  const eventStartDate = new Date(`${eventStringDate}T${startTime}`)
  const eventEndDate = new Date(`${eventStringDate}T${endTime}`)

  if (eventStartDate <= Date.now() && Date.now() <= eventEndDate) return 'en_progreso'
  if (eventStartDate < Date.now()) return 'terminado'
  if (eventStartDate > Date.now()) return 'sin_empezar'
}
export const getPlaceName = async (lat, lng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    const placeName = data.display_name;
    // console.log(placeName)
    return placeName
  } catch (error) {
    console.log('Error')
    return "Custom"
  }
};
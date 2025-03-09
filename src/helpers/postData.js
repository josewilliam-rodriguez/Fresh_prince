export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    responseData = null;
  }

  console.log('Response Status:', response.status); // Depurar el código de estado
  console.log('Response Data:', responseData); // Depurar los datos de la respuesta

  return { status: response.status, data: responseData };
};
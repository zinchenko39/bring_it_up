const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
  }); // Return promise

  return await res.text();
};

export default postData;

const GET = (url: string) => {
  return fetch(url)
    .then((res: any) => res.json())
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => {
      return error;
    });
};

export { GET };

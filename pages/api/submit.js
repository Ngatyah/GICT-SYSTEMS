
/**
 * Enable us to post data from our serve side to external server 
 * @param {object} postData user input data
 * @returns server feedback
 */
const postData = async (postData) => {
    const response = await fetch(
        "http://developers.gictsystems.com/api/dummy/submit/",
        {
            method: 'POST',
            body: JSON.stringify(postData),
        }
    );
    const data = await response.json();
    const status = response.status;
    console.log(data, status)
    return { status, data }
}

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const reqBody = req.body;
    const { status, data } = await postData(reqBody);

    res.status(status).json(data)
}

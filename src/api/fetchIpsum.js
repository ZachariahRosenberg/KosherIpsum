export function fetchIpsum(ipsumNumParagraphs=3, ipsumLength='s', excludeIpsum=false, startWithOy=true){
    return new Promise((resolve, reject)=>{
        const ipsumUrl = 'http://localhost:5001/kosher-ipsum/us-central1/generateIpsum';

        fetch(`${ipsumUrl}?` + new URLSearchParams({
            ipsumNumParagraphs,
            ipsumLength,
            excludeIpsum,
            startWithOy
        }))
        .then(response => response.json())
        .then(data => resolve(data.result))
        .catch(error => reject(error));
    });
}
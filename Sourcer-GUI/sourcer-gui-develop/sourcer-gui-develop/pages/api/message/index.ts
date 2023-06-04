import type { NextApiRequest, NextApiResponse } from 'next';

// ContactProfile

// Deleteemailtemplates

// Getemailtemplates

// Savetemplates

// Jobseekermessage

// retrieveJobseekerMessage

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id == 'pdl-') {
    const resData = await fetch(`MESSAGE_ENDPOINT` + req.query.id)
      .then(response => response.text())
      .then(result => JSON.parse(result).data);

    res.status(200).json({ data: resData });
  } else if (req.query.id == 'jbt-') {
    // do stuff here
  }
}

export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 纯手工只带入官方必需的 Header，不携带任何原始国内客户端特征
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization'] || ''
    };

    // 从美国 AWS 节点向 TypeSafe 发起请求
    const response = await fetch('https://api.typesafe.ai/v1/systemone', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    // 原样返回状态码与响应体
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

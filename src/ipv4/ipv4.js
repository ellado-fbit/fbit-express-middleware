'use strict'

// Express middleware to extract the IPv4 address from the request object.
// The extracted IPv4 address will be available on the request via the 'ipv4' property.
// Also converts IPv6 format to IPv4 format.

const ipv4 = () => {
  return (req, res, next) => {
    let ipv4 = req.ip

    if (typeof(ipv4) === 'string') {
      ipv4 = ipv4.replace('::ffff:', '').replace('::1', '127.0.0.1')
      req.ipv4 = ipv4
      next()
    } else {
      return res.status(400).json({ error: 'IP address not detected as a string type' })
    }
  }
}

module.exports = ipv4
import React, { Component } from 'react'
import { Link, Text, Flex, Button, Card } from 'rebass'
import Head from 'next/head'
import { Input } from 'antd'
import '../styles/sheet.css'
import 'antd/dist/antd.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { key: cookies.get('apiKey') }
  }
  onChange = event => {
    cookies.set('apiKey', event.target.value, { path: '/' })
    this.setState({ key: cookies.get('apiKey') })
    //console.log(cookies.get('apiKey'))
  }
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Merriweather"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="og:image"
            content="https://cdn.zeit.co/zeit/twitter-card.png"
          />
          <link
            rel="shortcut icon"
            href="https://cdn.zeit.co/favicon/favicon.ico"
          />
          <title>now.sh deployments and aliases</title>
        </Head>
        <body>
          <Flex alignItems="center" justifyContent="center">
            <Text fontSize={[3, 4, 5]}>now.sh deployments and aliases</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <div className="glitch large" data-text="▲">
              ▲
            </div>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Card
              width={[1, 1, 1 / 2]}
              bg="whitesmoke"
              m={3}
              p={3}
              borderRadius={9}
              boxShadow="0 3px 9px rgba(0, 0, 0, 0.25)"
            >
              <Flex alignItems="center" justifyContent="center">
                <Text>
                  To get/assign an API key, go to:{' '}
                  <Link href="https://zeit.co/account/tokens">
                    zeit.co/account/tokens
                  </Link>
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="center">
                <Text fontSize={[1, 2, 3]}>Enter your api key:</Text>
                <Flex alignItems="center" justifyContent="center">
                  <Input
                    placeholder="Paste the key here"
                    allowClear
                    onChange={this.onChange}
                  />
                </Flex>
              </Flex>
              <Flex alignItems="center" justifyContent="center">
                <Text fontSize={[1, 2, 3]}>
                  The API key is set as: {this.state.key}
                </Text>
              </Flex>
            </Card>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Card
              fontSize={3}
              fontWeight="bold"
              width={1 / 4}
              p={3}
              m={3}
              bg="whitesmoke"
              borderRadius={9}
              boxShadow="0 3px 21px rgba(0, 0, 0, 0.25)"
            >
              <Flex alignItems="center" justifyContent="center">
                <Button bg="transparent">
                  <Link href="/deployments"> See your deployments</Link>
                </Button>
              </Flex>
            </Card>
            <Card
              fontSize={3}
              fontWeight="bold"
              width={1 / 4}
              p={3}
              m={3}
              bg="whitesmoke"
              borderRadius={9}
              boxShadow="0 3px 21px rgba(0, 0, 0, 0.25)"
            >
              <Flex alignItems="center" justifyContent="center">
                <Button bg="transparent">
                  <Link href="/aliases"> See your aliases</Link>
                </Button>
              </Flex>
            </Card>
          </Flex>
        </body>
      </React.Fragment>
    )
  }
}

export default Index

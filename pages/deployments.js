import React, { Component } from 'react'
import moment from 'moment'
import { Text, Flex, Box, Card, Link } from 'rebass'
import injectSheet from 'react-jss'
import Head from 'next/head'
import { List } from 'antd'
import '../styles/sheet.css'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const styles = {}
class Deployments extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {}, error: false }
  }

  getData = async () => {
    var data = null
    var xhr = new XMLHttpRequest()
    let setData = r => {
      console.log(r)
      this.setState({ data: JSON.parse(r) })
    }
    let error = () => {
      this.setState({ error: true })
    }
    await xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        try {
          if (
            JSON.parse(this.responseText).error.message === 'Not authorized'
          ) {
            error()
          }
        } catch {
          setData(this.responseText)
        }
      }
    })
    xhr.open('GET', 'https://api.zeit.co/now/deployments')
    xhr.setRequestHeader('authorization', 'Bearer ' + cookies.get('apiKey'))
    await xhr.send(data)
  }
  componentDidMount() {
    this.getData()
    //console.log('Component DID MOUNT!')
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <script type="text/javascript" src="date.js" />
          <title>Now.sh Deployments</title>
        </Head>
        <Flex justifyContent="center">
          <Text fontSize={[3, 4, 5]}>▲ now.sh deployments</Text>
        </Flex>
        {this.state.error ? (
          <Flex justifyContent="center">
            <Card
              fontSize={3}
              color="red"
              width={[1, 1, 1 / 2]}
              p={3}
              m={3}
              bg="whitesmoke"
              borderRadius={9}
              boxShadow="0 3px 21px rgba(0, 0, 0, 0.25)"
            >
              Your API key is incorrect, or you did not enter one.
              <br /> Go to <Link href="/">the root</Link> of this website to set
              the API key.
            </Card>
          </Flex>
        ) : (
          <div />
        )}

        <List
          dataSource={this.state.data.deployments}
          renderItem={item => (
            <List.Item>
              <Box p={3} width={1 / 2}>
                <Link href={'https://' + item.url}>
                  <Text fontFamily="Monospace" fontSize={[1, 2]}>
                    {/*item.alias.length > 30
                          ? item.alias.substring(0, 30 - 3) + '...'
                          : item.alias*/}
                    {item.name}
                  </Text>
                </Link>
              </Box>

              <Box p={3} width={1 / 3}>
                <Flex>
                  <Text fontFamily="Monospace" fontSize={[1, 2]}>
                    {moment.unix(item.created / 1000).fromNow()}
                  </Text>
                </Flex>
              </Box>
            </List.Item>
          )}
        />
      </React.Fragment>
    )
  }
}

export default injectSheet(styles)(Deployments)

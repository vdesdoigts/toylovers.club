import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/core'
import { RiSearchLine } from 'react-icons/ri'
import { useWindowScroll } from 'react-use'
import Container from '../Container'
import RoundedButton from '../RoundedButton'

const Header = () => {
  const { y } = useWindowScroll()
  console.log('y: ', y)
  const [isMinified, setIsMinified] = useState(false)

  useEffect(() => {
    if (y > 70 && !isMinified) {
      setIsMinified(true)
    } else if (y <= 70 && isMinified) {
      setIsMinified(false)
    }
  }, [y])

  return (
    <Box
      as="header"
      position="fixed"
      zIndex={10}
      top={0}
      left={0}
      width="100%"
      px={8}
      bgColor="white"
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        transition="all 0.4s cubic-bezier(.08,.52,.52,1)"
        height={isMinified ? '7rem' : '10rem'}
      >
        <Heading
          as="p"
          position="relative"
          zIndex={1}
          display="inline-block"
          marginBottom="1"
          fontSize="4.4rem"
          fontWeight="black"
          textTransform="uppercase"
          transition="all 0.4s cubic-bezier(.08,.52,.52,1)"
          transformOrigin="center left"
          transform={isMinified ? 'scale(.7)' : 'scale(1)'}
          _before={{
            content: `""`,
            position: 'absolute',
            zIndex: -1,
            bottom: 0,
            left: '-6px',
            display: 'block',
            width: 'calc(100% + 12px)',
            height: '56%',
            bg: '#FFFC0B',
          }}
        >
          Toy Lovers
        </Heading>
        <Box>
          <RoundedButton fontSize="2.2rem" color="#000">
            <Icon
              as={RiSearchLine}
              display="inline-block"
              pb=".4rem"
              verticalAlign="middle"
            />
          </RoundedButton>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
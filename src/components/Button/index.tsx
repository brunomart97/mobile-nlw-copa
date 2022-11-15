import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'PRIMARY' | 'SECUNDARY'
}

export const Button = ({ title, type = 'PRIMARY', ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECUNDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECUNDARY' ? 'red.600' : 'yellow.600'
      }}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === 'SECUNDARY' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}

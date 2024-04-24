import styled from "styled-components";

interface GreenButtonProps {
  onclick: () => void;
  content: string;
}

const ButtonContainer = styled.div`
  display: inline-block;
`;

const ButtonStyle = styled.div`
  background-color: #163760;
  border-radius: 10px;
  cursor: pointer;
  /* box-shadow: 0px 0px 5px #0b1c31; */
  padding: 0.05px 100px;

  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.p`
  color: white;
  font-family: "im-hyemin-bold";
  font-size: 20px;
`;

const Button: React.FC<GreenButtonProps> = ({
  onclick,
  content,
}: GreenButtonProps) => {
  return (
    <ButtonContainer onClick={onclick}>
      <ButtonStyle>
        <Text>{content}</Text>
      </ButtonStyle>
    </ButtonContainer>
  );
};

export default Button;

import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { FaQuestion, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Heading from "./Heading";
import { TbBrandGithub, TbBulb, TbLockAccess } from "react-icons/tb";

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: end;
  background-color: var(--color-grey-50);
`;

const WrapperModal = styled.div`
  width: 500px; /* Tetapkan lebar modal */
  max-width: 90vw; /* Agar tetap responsif */
  min-height: 550px; /* Pastikan modal memiliki tinggi minimal */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  text-align: center;
  justify-content: center; /* Pusatkan konten */
`;

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: var(--color-brand-600);

  &:hover {
    color: var(--color-brand-700);
  }

  &:disabled {
    color: var(--color-grey-300);
    cursor: not-allowed;
  }
`;

const DotsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "var(--color-brand-600)" : "var(--color-grey-300)"};
  transition: background-color 0.3s ease-in-out;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Tooltip = styled.span`
  position: absolute;
  right: 40px;
  background-color: var(--color-grey-900);
  color: var(--color-grey-0);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;

  ${TooltipWrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const Icon = styled(FaQuestion)`
  font-size: 32px;
  cursor: pointer;
  color: var(--color-brand-600);

  &:hover {
    color: var(--color-brand-700);
  }
`;

const A = styled.a`
  color: var(--color-brand-600);

  &:hover {
    color: var(--color-brand-700);
  }
`;

const MAX_PAGE = 3;

function HowToUse() {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, MAX_PAGE));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <Wrapper>
      <Modal>
        <Modal.Open>
          <TooltipWrapper>
            <Tooltip>Website Testing Instructions</Tooltip>
            <Icon />
          </TooltipWrapper>
        </Modal.Open>
        <Modal.Window>
          <WrapperModal>
            {/* Konten dengan tinggi seragam */}
            {page === 1 && (
              <>
                <TbLockAccess size={400} strokeWidth={0.7} />
                <Heading as="h3">🔹 Accessing the Web App 🔹</Heading>
                <div>
                  <p>You can access this web app with a demo account:</p>
                  <p>
                    <strong>Username:</strong> test@test.com
                  </p>
                  <p>
                    <strong>Password:</strong> test12345
                  </p>
                </div>
              </>
            )}

            {page === 2 && (
              <>
                <TbBulb size={400} strokeWidth={0.7} />
                <Heading as="h3">🔹 Navigating the Dashboard 🔹</Heading>
                <div>
                  <p>After logging in, explore the dashboard features.</p>
                  <p>
                    Check analytics, user settings, content management, and
                    more.
                  </p>
                </div>
              </>
            )}

            {page === 3 && (
              <>
                <TbBrandGithub size={400} strokeWidth={0.7} />
                <Heading as="h3">🔹 You're good to go! 🔹</Heading>
                <div>
                  <p>
                    Welcome aboard! Feel free to navigate through the features,
                    for more insights visit our
                  </p>
                  <A href="/">Documentation</A>
                </div>
              </>
            )}

            {/* Navigasi */}
            <NavigationWrapper>
              <ArrowButton onClick={prevPage} disabled={page === 1}>
                <FaArrowLeft />
              </ArrowButton>

              <DotsWrapper>
                {[...Array(MAX_PAGE)].map((_, index) => (
                  <Dot key={index} active={page === index + 1} />
                ))}
              </DotsWrapper>

              <ArrowButton onClick={nextPage} disabled={page === MAX_PAGE}>
                <FaArrowRight />
              </ArrowButton>
            </NavigationWrapper>
          </WrapperModal>
        </Modal.Window>
      </Modal>
    </Wrapper>
  );
}

export default HowToUse;

import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

interface LoadingProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}

const StyledAlert = styled(Alert)(({ theme }) => ({
  margin: `${theme.spacing(4)} 0`,
}));

function Loading({ isLoading, isError, errorMessage, children }: LoadingProps): JSX.Element {
  return (
    <>
      <Backdrop sx={{ zIndex: 10 }} open={isLoading}>
        <CircularProgress color="primary" size="60px" />
      </Backdrop>
      {children}
      {isError && (
        <StyledAlert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </StyledAlert>
      )}
    </>
  );
}

export default Loading;

import { ExtendedButtonProps } from '@globalTypes/MUI/ExtendedButtonProps'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const StyledForm = styled('form')(
  () => css`
    display: flex;
    text-align: left;
    flex-wrap: wrap;
    font-family: Source Sans Pro;
  `,
)

export const ImageArea = styled('div')(
  () => css`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: left;
  `,
)

export const ImageLabel = styled('label')(
  () => css`
    flex-basis: 100%;
  `,
)

export const ImageHelperText = styled('span')(
  () => css`
    flex-basis: 100%;
    color: gray;
    font-size: 14px;
  `,
)

export const ImageButtonContainer = styled('div')(
  () => css`
    margin-top: 10px;
    flex-basis: 100%;
  `,
)

export const FileUploadButton = styled(Button)<ExtendedButtonProps>(
  () => css`
    width: 150px;
    height: 52px;
    padding: 8px;
  `,
)

export const VisuallyHiddenInput = styled('input')(
  () => css`
    display: none;
  `,
)

export const ClearButton = styled(Button)(
  () => css`
    height: 100%;
    margin-left: 10px;
  `,
)

export const PreviewImage = styled('img')(
  () => css`
    margin-top: 10px;
    width: 85px;
    display: block;
  `,
)

export const SubmitArea = styled('div')(
  () => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `,
)

export const SubmitButton = styled(Button)(
  () => css`
    margin-top: 40px;
    flex-basis: 100%;
  `,
)

export const SubmitMessage = styled('label')<{ color?: string }>(
  ({ color }) => css`
    flex-basis: 100%;
    color: ${color || 'black'};
    margin-top: 10px;
  `,
)

import React from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { Language as LanguageIcon } from '@mui/icons-material'
import { useLanguage } from '@/hooks/useLanguage'
import type { Language } from '@/i18n'

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    handleClose()
  }

  return (
    <>
      <Tooltip title="Switch Language">
        <IconButton
          onClick={handleClick}
          color="default"
          aria-label="switch language"
          aria-controls={open ? 'language-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        <MenuItem
          selected={language === 'en'}
          onClick={() => handleLanguageChange('en')}
        >
          English
        </MenuItem>
        <MenuItem
          selected={language === 'zh'}
          onClick={() => handleLanguageChange('zh')}
        >
          中文
        </MenuItem>
      </Menu>
    </>
  )
}

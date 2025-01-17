import React, { useMemo } from 'react';
import Overlay, { OverlayProps } from '@uiw/react-overlay';
import Icon, { IconProps } from '@uiw/react-icon';
import Button from '@uiw/react-button';
import { HTMLDivProps } from '@uiw/utils';
import './style/index.less';

export interface DrawerProps extends OverlayProps {
  footer?: React.ReactNode;
  icon?: IconProps['type'];
  title?: React.ReactNode;
  bodyProps?: HTMLDivProps;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  size?: number;
  isCloseButtonShown?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default (props: DrawerProps = {}) => {
  const {
    prefixCls = 'w-drawer',
    className,
    style,
    placement = 'right',
    size = 260,
    title,
    footer,
    icon,
    isCloseButtonShown = true,
    bodyProps,
    timeout = 300,
    isOpen = false,
    maskClosable = true,
    ...overlayProps
  } = props;
  const cls = [className, prefixCls, placement].filter(Boolean).join(' ').trim();
  const bodyCls = [bodyProps ? bodyProps.className : null, prefixCls ? `${prefixCls}-body-inner` : null]
    .filter(Boolean)
    .join(' ')
    .trim();
  const styl = {
    ...style,
    [/^(top|bottom)$/.test(placement!) ? 'height' : 'width']: size,
  };
  const footerView = useMemo(() => (footer ? <div className={`${prefixCls}-footer`}>{footer}</div> : null), [footer]);
  const iconView = useMemo(() => (icon ? <Icon type={icon} /> : null), [icon]);
  const titleView = useMemo(() => (title ? <h4>{title}</h4> : null), [title]);
  return (
    <Overlay className={cls} timeout={timeout} isOpen={isOpen} maskClosable={maskClosable} {...overlayProps}>
      <div className={`${prefixCls}-wrapper`} style={styl}>
        {(title || icon) && (
          <div className={`${prefixCls}-header`}>
            {iconView}
            {titleView}
            {title && isCloseButtonShown && <Button basic onClick={props.onClose} icon="close" type="light" />}
          </div>
        )}
        <div className={`${prefixCls}-body`}>
          <div {...bodyProps} className={bodyCls}>
            {props.children}
          </div>
        </div>
        {footerView}
      </div>
    </Overlay>
  );
};

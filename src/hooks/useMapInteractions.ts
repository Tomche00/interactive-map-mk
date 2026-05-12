import { useAppDispatch, useAppSelector } from '@/hooks';
import { setHoveredLocation, setTooltipPosition } from '@/store/slices/uiSlice';
import type { Location } from '@/types/location';

export const useMapInteractions = () => {
  const dispatch = useAppDispatch();
  const hoveredLocation = useAppSelector(state => state.ui.hoveredLocation);
  const tooltipPosition = useAppSelector(state => state.ui.tooltipPosition);

  const handlePinHover = (location: Location, event: React.MouseEvent) => {
    dispatch(setHoveredLocation(location));
    dispatch(setTooltipPosition({ x: event.clientX, y: event.clientY }));
  };

  const handlePinLeave = () => {
    setTimeout(() => {
      dispatch(setHoveredLocation(null));
    }, 100);
  };

  const handlePinMove = (event: React.MouseEvent) => {
    dispatch(setTooltipPosition({ x: event.clientX, y: event.clientY }));
  };

  const handleTooltipMouseEnter = () => {};
  const handleTooltipMouseLeave = () => {
    dispatch(setHoveredLocation(null));
  };

  const handleNavigation = (location: Location) => {
    const { latitude, longitude } = location;
    const coords = `${latitude},${longitude}`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`geo:${coords}?q=${coords}(${encodeURIComponent(location.name)})`, '_system');
      setTimeout(() => {
        window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
      }, 1000);
    } else {
      window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
    }
  };

  return {
    hoveredLocation,
    tooltipPosition,
    handlePinHover,
    handlePinLeave,
    handlePinMove,
    handleNavigation,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  };
};

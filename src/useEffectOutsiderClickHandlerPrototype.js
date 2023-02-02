// TO-DO outsourcen: handlerComponent für Popups die nur einen Hinweis geben aber weggeklickt werden können
useEffect(() => {
  const outsideClickHandler = (e) => {
    if (e.target === modalRef.current) {
      props.setShow(false);
    }
  };
  window.addEventListener('click', outsideClickHandler);
  return () => {
    window.removeEventListener('click', outsideClickHandler);
  };
}, [props]);
// To Do End

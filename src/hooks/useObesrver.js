import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoad, callback) => {
    const observer = useRef()
    useEffect(() => {
        if(isLoad) return
        if(observer.current) observer.current.disconnect()
        const cb = (entries, observer) => {
          if(entries[0].isIntersecting && canLoad){
            callback()
          }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
      }, [isLoad])
}
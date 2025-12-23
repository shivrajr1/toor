import React from 'react'

export default function Loading() {
  return (
    <div style={{
        width:'100%',
        height:'90vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'fixed',
        zIndex:10,
        backgroundColor:'rgba(255, 255, 255, 0.8)'
    }}>
        <p style={{
            color:'black',
            fontWeight:'700',
            fontSize:'20px'
        }}>loading..</p>
    </div>
  )
}

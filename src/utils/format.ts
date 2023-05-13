export const formatAssetHealthBg = (health: number) => {
  if(health <= 35){
    return 'red'
  }
  if(health <= 55){
    return 'orange'
  }
  if(health <= 75){
    return 'grey'
  }
  if(health > 75){
    return 'green'
  }
}

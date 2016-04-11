#!/bin/bash
#roslaunch bwi_logging record.launch topics:="/move_base/global_costmap/costmap /move_base/global_costmap/costmap_updates" directory:="~/costmaps" prefix:="costmap" --screen
mkdir -p ~/costmaps/
cd ~/costmaps
rosbag record -ocostmap -j /move_base/global_costmap/costmap /move_base/global_costmap/costmap_updates

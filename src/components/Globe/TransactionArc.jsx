import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TransactionArc = ({ start, end, color = '#0071e3', delay = 0, radius = 2.1 }) => {
    const arcRef = useRef();
    const particleRef = useRef();
    const progressRef = useRef(delay);

    // Convert lat/long to 3D coordinates on sphere
    const latLongToVector3 = (lat, lon, r) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = r * Math.sin(phi) * Math.sin(theta);
        const y = r * Math.cos(phi);

        return new THREE.Vector3(x, y, z);
    };

    const startVec = useMemo(() => latLongToVector3(start.lat, start.lon, radius), [start, radius]);
    const endVec = useMemo(() => latLongToVector3(end.lat, end.lon, radius), [end, radius]);

    // Create curve for arc - HIGHER ARC for cartoonish feel
    const curve = useMemo(() => {
        const midPoint = startVec.clone().add(endVec).multiplyScalar(0.5);
        const distance = startVec.distanceTo(endVec);
        midPoint.normalize().multiplyScalar(radius + distance * 0.5); // Arc height relative to radius

        return new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
    }, [startVec, endVec, radius]);

    const points = useMemo(() => curve.getPoints(30), [curve]);

    // Thicker tube geometry
    const tubeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 20, 0.025, 8, false); // Increased thickness for larger scale
    }, [points]);

    // Animate particle along arc
    useFrame((state, delta) => {
        if (particleRef.current) {
            progressRef.current += delta * 0.1;

            if (progressRef.current > 1 + delay) {
                progressRef.current = delay;
            }

            const t = Math.max(0, Math.min(1, progressRef.current - delay));
            const point = curve.getPoint(t);
            particleRef.current.position.copy(point);

            const scale = Math.sin(t * Math.PI);
            particleRef.current.scale.setScalar(1 + scale * 0.5);
        }
    });

    return (
        <group>
            <mesh geometry={tubeGeometry}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                />
            </mesh>
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
};

export default TransactionArc;
